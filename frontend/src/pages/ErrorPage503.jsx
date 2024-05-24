import React from "react";

const ErrorPage503 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">503</h1>
        <p className="text-2xl text-gray-800">
          The application is currently undergoing speed test
        </p>
      </div>
    </div>
  );
};

export default ErrorPage503;
