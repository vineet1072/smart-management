import React from "react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="py-2 px-6 bg-white flex items-center shadow sticky top-0 left-0 z-30">
      <button onClick={toggleSidebar} className="text-lg text-gray-600">
        <i className="ri-menu-line"></i>
      </button>
      <ul className="flex items-center text-sm ml-4">
        <li className="mr-2">
          <a href="#" className="text-gray-400 hover:text-gray-600">
            Dashboard
          </a>
        </li>
        <li className="text-gray-600 mx-2">/</li>
        <li className="text-gray-600">Analytics</li>
      </ul>
      <div className="ml-auto flex items-center space-x-4">
        <button className="text-gray-400 hover:text-gray-600">
          <i className="ri-search-line"></i>
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <i className="ri-notification-3-line"></i>
        </button>
        <img
          src="https://placehold.co/32x32"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
