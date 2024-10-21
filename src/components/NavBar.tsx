import React, { useState } from "react";
import { NavLink } from "react-router-dom";


const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-950 py-4 px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-semibold">Posts App</div>

        {/* desktop */}
        <div className="flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-blue-200 ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `text-white hover:text-blue-200 ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            Users
          </NavLink>

          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `text-white hover:text-blue-200 ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            Posts
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
