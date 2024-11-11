import React, { useState, useEffect } from "react";
import axios from "axios";

const Advices = ({ onChange, existingAdvices = [] }) => {
  const [checkedAdvices, setCheckedAdvices] = useState([]);
  const [textareaContent, setTextareaContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Predefined checkbox advices
  const predefinedAdvices = [
    "Mouth Gargle",
    "After eating use every night tooth brush",
    "Please take some bed rest",
  ];

  useEffect(() => {
    if (
      Array.isArray(existingAdvices) &&
      existingAdvices.length > 0 &&
      checkedAdvices.length === 0 &&
      existingAdvices.some((advice) => advice.advicesName) // Ensure there is meaningful data
    ) {
      const initialAdvices = existingAdvices
        .filter((advice) => advice.advicesName) // Filter out any items without `advicesName`
        .map((advice) => advice.advicesName);
      setCheckedAdvices(initialAdvices);
      setTextareaContent(initialAdvices.join("\n"));
    }
  }, [existingAdvices]);

  // Format advices as array of objects with { advicesName }
  const formatAdvices = () => {
    const allAdvices = [
      ...checkedAdvices,
      ...textareaContent.split("\n").map((advice) => advice.trim()),
    ];

    // Use a Set to remove duplicates and filter out empty strings
    const uniqueAdvices = Array.from(new Set(allAdvices))
      .filter((advice) => advice) // Filter out empty strings
      .map((advice) => ({
        advicesName: advice,
      }));

    return uniqueAdvices;
  };

  // Sync textarea with all advice selections
  const updateTextareaContent = () => {
    const allAdvices = [
      ...new Set([
        ...checkedAdvices,
        ...textareaContent.split("\n").map((advice) => advice.trim()),
      ]),
    ];
    setTextareaContent(allAdvices.join("\n"));

    if (onChange) {
      onChange(formatAdvices());
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (advice) => {
    setCheckedAdvices((prev) => {
      const updatedAdvices = prev.includes(advice)
        ? prev.filter((item) => item !== advice) // Remove if already selected
        : [...prev, advice]; // Add if not selected

      updateTextareaContent(updatedAdvices); // Update textarea with unique items

      if (onChange) {
        onChange(formatAdvices()); // Pass formatted data to parent
      }
      return updatedAdvices;
    });
  };

  // Fetch random suggestions
  const fetchRandomSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/advices/getdropdown/random`,
        { params: { limit: 5 } }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching random suggestions:", error);
    }
  };

  // Fetch search suggestions based on user input
  const fetchSearchSuggestions = async () => {
    if (searchTerm.trim() === "") return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/advices/getdropdown`,
        { params: { query: searchTerm } }
      );
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  // Call fetchSearchSuggestions whenever searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      fetchSearchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Update textarea content whenever checkedAdvices changes
  useEffect(() => {
    updateTextareaContent();
  }, [checkedAdvices]);

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    const suggestionText =
      typeof suggestion === "string" ? suggestion : suggestion.advicesName;

    // Only add to checkedAdvices if it's not already there
    if (suggestionText && !checkedAdvices.includes(suggestionText)) {
      setCheckedAdvices((prev) => {
        const updatedAdvices = [...prev, suggestionText];
        updateTextareaContent(updatedAdvices); // Update textarea with unique items

        if (onChange) {
          onChange(formatAdvices()); // Pass formatted data to parent
        }
        return updatedAdvices;
      });
    }

    setSearchTerm("");
    setSuggestions([]);
  };

  // Handle Enter key in textarea to save new advice
  const handleTextareaKeyDown = async (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      e.preventDefault();

      const existsInDatabase = suggestions.some(
        (s) => s.advicesName.toLowerCase() === searchTerm.toLowerCase()
      );

      if (!existsInDatabase) {
        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/advices/create`,
            { advicesName: searchTerm }
          );
          alert("Advice saved successfully!");
        } catch (error) {
          console.error("Error saving new advice:", error);
        }
      }
      setTextareaContent((prevContent) =>
        `${prevContent}\n${searchTerm}`.trim()
      );
      if (onChange) {
        onChange(formatAdvices()); // Pass formatted data to parent
      }
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  // Show random suggestions on textarea focus
  const handleTextareaFocus = () => {
    fetchRandomSuggestions();
    setShowSuggestions(true);
  };

  // Hide suggestions on textarea blur
  const handleTextareaBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150);
  };

  // Handle direct typing in textarea
  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setTextareaContent(value);

    if (onChange) {
      onChange(formatAdvices()); // Pass formatted data to parent
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <h1 className="text-custom-gray text-lg xl:text-xl font-semibold py-4 border-b border-black/20">
        Advices
      </h1>
      <div className="relative w-full">
        <textarea
          placeholder="Any Advices"
          className="bg-white rounded outline-none py-5 px-6 min-h-[20vmax] w-full resize-none text-sm text-custom-gray"
          value={textareaContent}
          onChange={handleTextareaChange}
          onKeyDown={handleTextareaKeyDown}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
        ></textarea>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute bottom-[-5rem] bg-white w-full z-10 shadow-lg rounded-md">
            {suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                onMouseDown={() => handleSelectSuggestion(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.advicesName}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {predefinedAdvices.map((advice, index) => (
          <div className="flex gap-1 items-center" key={index}>
            <input
              type="checkbox"
              id={advice}
              checked={checkedAdvices.includes(advice)}
              onChange={() => handleCheckboxChange(advice)}
              className="accent-custom-blue cursor-pointer"
            />
            <label
              htmlFor={advice}
              className="whitespace-nowrap text-sm text-custom-gray cursor-pointer"
            >
              {advice}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advices;
