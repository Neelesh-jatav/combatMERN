import React, { useEffect, useState } from "react";
import logo_combat from "../assets/logo_combat.png";
import placeholder from "../assets/placeholder.jpg";
import AuthModal from "../pages/AuthModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopBar = ({ currentSection, setSection }) => {
  const sections = ["HOME", "WEAPONS", "DOCUMENT", "LEGACY", "HEADLINES", "OTHER"];
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleAccountClick = () => {
    if (isAuthenticated) {
      if (user?.role === "Admin") {
        navigate("/adminprofile");
      } else {
        navigate("/profile");
      }
    } else {
      setShowAuth(true);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-500 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="overflow-hidden flex items-center justify-between px-8 h-[80px]">
          <img
            src={logo_combat}
            alt="Combat Logo"
            className="h-[105px] w-[141px] object-contain cursor-pointer"
            onClick={() => setSection("HOME")}
          />
          <div className="flex space-x-12 text-lg font-bold text-black">
            {sections.map((item) => (
              <button
                key={item}
                onClick={() => setSection(item)}
                className={`hover:text-blue-600 transition ${currentSection === item ? "text-blue-600 underline" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* ACCOUNT / PROFILE Button */}
          <div className="flex flex-col items-center cursor-pointer group" onClick={handleAccountClick}>
            <img
              src={placeholder}
              alt="account"
              className="h-[56px] w-[73px] object-contain rounded-md group-hover:opacity-80"
            />
            <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium">
              {isAuthenticated ? "PROFILE" : "ACCOUNT"}
            </span>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default TopBar;
