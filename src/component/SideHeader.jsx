import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const AdminSideHeader = ({ isMobileSidebarOpen, closeMobileSidebar }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const location = useLocation();

  const sideheader = [
    {
      icon: "/icons/dashboard.svg",
      name: "Dashboard",
      link: "/doctor/dashboard",
    },
    {
      icon: "/icons/navpatient.svg",
      name: "Patients",
      link: "/doctor/patients",
    },
  ];

  const handleIconClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  // Reset active index when the sidebar is closed
  useEffect(() => {
    if (!isMobileSidebarOpen) {
      setActiveIndex(null);
    }
  }, [isMobileSidebarOpen]);

  // Handle mouse leave for the entire sidebar
  useEffect(() => {
    const handleMouseLeave = () => {
      setHoveredIndex(null);
      setActiveIndex(null);
      setIsSidebarHovered(false);
    };

    const sidebarElement = document.getElementById("admin-sidebar");
    sidebarElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sidebarElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="admin-sidebar"
      className={`absolute flex flex-col gap-4 h-full bg-[white] shadow-custom-light transition-all duration-300 z-50 ${
        isMobileSidebarOpen ? "block" : "hidden"
      } md:flex ${
        isSidebarHovered || activeIndex !== null ? "w-64" : "w-[5rem]"
      }`}
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
    >
      <div className="flex justify-center items-center mt-4 border-b p-2 pb-5  border-[#00000033]">
        {isSidebarHovered || activeIndex !== null ? (
          <img
            src="/images/dentitydentallogo.png"
            alt="Clinic Logo"
            className="h-[3rem] "
          />
        ) : (
          <img
            src="/images/dentitydentallogoshort.png"
            alt="clinic Logo"
            className="h-[3rem] "
          />
        )}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {sideheader.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-start"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleIconClick(index)}
          >
            <div
              className={`flex items-center p-2 pl-4 rounded-lg w-full ${
                hoveredIndex === index || location.pathname === item.link
                  ? "bg-gradient-to-b from-[#FFFFFF] to-[#EAEAEA]"
                  : "bg-transparent"
              } `}
              style={{
                transition: "background-color 0.5s ease, width 0.5s ease",
              }}
            >
              <div className="h-[1.5rem] w-[2px] bg-[#27B3FF]"></div>
              <span className={`p-2 rounded-md  `}>
                <img
                  src={item.icon}
                  alt={item.name}
                  className={`h-[1.4rem] w-[1.4rem]  `}
                />
              </span>
              {(isSidebarHovered || activeIndex !== null) && (
                <>
                  {item.link ? (
                    <Link
                      to={item.link}
                      className={` font-semibold cursor-pointer ml-2 ${
                        location.pathname === item.link
                          ? "text-[#27B3FF]"
                          : " text-[#666666]"
                      }`}
                      onClick={closeMobileSidebar}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span
                      className={` font-semibold cursor-pointer ml-2 ${
                        location.pathname === item.link
                          ? "text-[#27B3FF]"
                          : "text-[#666666]"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Render Dropdown Links if available */}
            {item.links?.length > 0 && (
              <div
                className={`flex flex-col w-full ml-4 overflow-hidden ease-in-out ${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                }`}
                style={{
                  transform: activeIndex === index ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                  transition: "transform 0.5s ease, max-height 0.9s ease",
                }}
              >
                {item.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={link.link}
                    className={`pl-10 py-2 transition-all duration-1000 ease-in-out ${
                      location.pathname === link.link
                        ? "text-[#BDBDBD]"
                        : "text-[#777777]"
                    }`}
                    style={{
                      transform:
                        activeIndex === index
                          ? "translateY(0)"
                          : "translateY(-10px)",
                      opacity: activeIndex === index ? 1 : 0,
                      transition:
                        "transform 0.5s ease, opacity 0.5s ease, color 0.3s ease",
                    }}
                    onClick={closeMobileSidebar} // Close sidebar on link click
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSideHeader;
