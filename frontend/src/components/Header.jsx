import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <button
        onClick={toggleSidebar}
        className="text-gray-500 focus:outline-none lg:hidden"
      >
        ☰
      </button>
      <h1 className="text-lg font-semibold">Dashboard</h1>
    </header>
  );
};

export default Header;
