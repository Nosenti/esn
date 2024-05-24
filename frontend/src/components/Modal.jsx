import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 overflow-auto">
      <div
        className={`bg-white rounded-lg shadow-lg overflow-auto max-h-screen ${
          isTabletOrMobile ? "w-full mx-4" : "w-auto max-w-xl mx-auto"
        }`}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
          >
            Close
          </button>
          <div className="p-6 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
