import React from "react";
import okayImage from "../assets/icon/okay.png";
import helpImage from "../assets/icon/help.png";
import emergencyImage from "../assets/icon/emergency.png";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-end px-4 pt-5"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
          src={`${
            user.profile
              ? user.profile
              : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }`}
          alt="user profile"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-800">
          {user.username}
        </h5>
        <span
          className={`text-sm mb-1 ${
            user.status === "offline" ? "text-red-600" : "text-green-600"
          }`}
        >
          {user.status}
        </span>
        <div className="flex flex-row items-center">
          <div>
            {user.healthStatus === "OK" ? (
              <img src={okayImage} alt="" className="w-6 h-6" />
            ) : user.healthStatus === "Help" ? (
              <img src={helpImage} alt="" className="w-6 h-6" />
            ) : user.healthStatus === "Emergency" ? (
              <img src={emergencyImage} alt="" className="w-6 h-6" />
            ) : (
              ""
            )}
          </div>
          <span
            className={`text-sm ${
              user.healthStatus === "OK"
                ? "text-green-600"
                : user.healthStatus === "Help"
                ? "text-yellow-600"
                : user.healthStatus === "Emergency"
                ? "text-red-600"
                : ""
            }`}
          >
            {user.healthStatus}
          </span>
        </div>
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={() => navigate("/userProfileDetails", { state: { user } })}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
