import React from "react";

const SidebarItem = ({ modalOpen, children, onClick, title }) => {
  return (
    <div className="">
      <button
        onClick={onClick}
        className={`flex items-center space-x-2 p-2 rounded-lg ${
          modalOpen ? "bg-blue-700" : ""
        } hover:bg-blue-700 transition-colors duration-200`}
      >
        {children}
        <span className="font-medium">{title}</span>
      </button>
    </div>
  );
};

export default SidebarItem;
