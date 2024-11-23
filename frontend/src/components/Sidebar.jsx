import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:w-64`}
    >
      {/* Branding */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        <span className="text-lg font-bold">Logo</span>
        <button
          onClick={toggleSidebar}
          className="block text-gray-400 lg:hidden"
        >
          ✖
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <a
          href="#"
          className="block py-2.5 px-4 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Partners
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Orders
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Assignment
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
