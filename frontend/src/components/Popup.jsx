import React, { useState } from "react";

function Popup({ clickYes, clickNo, visibility, username }) {
  return (
    <div
      className={`bg-indigo-100 rounded-lg shadow-md p-6 ${
        visibility ? "" : "hidden"
      }`}
    >
      <p className="text-lg font-medium mb-4">
        Do you want to create a new user with username {username}?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={clickYes}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Yes
        </button>
        <button
          onClick={clickNo}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default Popup;
