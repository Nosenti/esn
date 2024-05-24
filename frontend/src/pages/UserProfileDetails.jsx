/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getProfile,
  changeRole,
  changeActiveStatus,
  updateProfile,
  updatePassword,
} from "../services/AppServices";
import Button from "../components/Button";
import Input from "../components/Input";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";

const UserProfileDetails = ({ currentUser }) => {
  const currUser = currentUser.user;
  console.log("curr_: ", currUser);
  const location = useLocation();
  const user = location.state.user;
  // const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  // const [image, setImage] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = (e, userId) => {
    const newRole = e.target.value;
    setInput((prev) => ({ ...prev, role: newRole }));
    const roleData = {
      role: newRole,
    };
    changeRole(userId, roleData)
      .then(() => {
        toast.success("role changed successfully");
      })
      .catch(() => {
        toast.error("Failed to change role");
      });
  };

  const [input, setInput] = useState({
    username: "",
    email: "",
    name: "",
    phoneNumber: null,
    country: "",
    city: "",
    currentLocation: "",
    id: "",
    isActive: "",
    role: "",
  });

  const [passwordInput, setPasswordInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const fetchProfile = async () => {
    try {
      const profile = await getProfile(user?._id);
      console.log("Profile:", profile);
      setInput({
        username: profile?.username || "",
        email: profile?.email || "",
        name: profile?.name || "",
        country: profile?.country || "",
        city: profile?.city || "",
        currentLocation: profile?.currentLocation || "",
        phoneNumber: profile?.phoneNumber || "",
        id: profile?._id,
        isActive: profile?.isActive,
        role: profile?.role,
      });
      setFile(profile?.profilePicture || "");
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    console.log("File", file);
  }, [file]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "location") {
      setLocation(event.target.value);
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPasswordInput({
      ...passwordInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handleStatusChange = async (e, userId) => {
    const isActive = e.target.checked;

    changeActiveStatus(userId, { isActive: isActive })
      .then(() => {
        setInput((prev) => ({ ...prev, isActive: isActive }));
        toast.success("status changed successfully");
      })
      .catch(() => {
        toast.error("Failed to change status");
        setInput((prev) => ({ ...prev, isActive: !isActive }));
      });
  };

  const handleUpdatePassword = async () => {
    try {
      if (passwordInput.newPassword !== passwordInput.confirmPassword) {
        setSubmitted(true);
        return;
      }
      if (input) {
        const response = await updatePassword(input.id, {
          // oldPassword: passwordInput?.oldPassword,
          newPassword: passwordInput?.newPassword,
        });
        console.log("Password updated:", response);
        toast.success("Password updated successfully");
      }

      setPasswordInput({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating password:", err);
      setIsModalOpen(false);
      toast.error("Password update failed");
    }
  };

  const handleUserDetailsUpdate = async () => {
    try {
      if (input) {
        const response = await updateProfile(input.id, input);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Profile update failed");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <nav className="p-6 bg-white fixed w-full z-10">
          <h2 className="text-lg font-bold">Profile Information</h2>
        </nav>
        <div className="w-full h-full p-6 mt-4">
          <div className="w-full bg-white py-6 px-8 mt-10 lg:mt-14 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Profile</h3>
            <div className="flex flex-col lg:flex-row mt-8 items-start justify-between">
              <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                <div className="relative w-36 lg:w-48 overflow-hidden rounded-full">
                  <img
                    className="w-36 h-36 lg:w-48 lg:h-48 rounded-full"
                    src={
                      !file
                        ? "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        : file
                    }
                    alt=""
                  />
                </div>
                {currUser?.role == "administrator" && (
                  <>
                    <div className="dropdown mt-4 pr-8 w-[70%]">
                      <select
                        id="role-select"
                        value={input.role}
                        onChange={(e) => handleRoleChange(e, input.id)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="coordinator">Coordinator</option>
                        <option value="administrator">Administrator</option>
                        <option value="citizen">Citizen</option>
                      </select>
                    </div>
                    <div className="mt-4 pr-8 w-[70%]">
                      <label
                        htmlFor="toggleActive"
                        className="flex items-center cursor-pointer"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="toggleActive"
                            className="sr-only"
                            checked={input.isActive}
                            onChange={(e) => handleStatusChange(e, input.id)}
                          />
                          <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                        <div className="ml-3 text-gray-700 font-medium">
                          {input.isActive === true ? "Active" : "Inactive"}
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex flex-row justify-between items-center mb-4">
                  <div className="text-lg font-bold">Personal Information</div>
                  {(currUser?.role === "administrator" ||
                    currUser._id === input.id) && (
                    <div>
                      <Button
                        size="large"
                        backgroundColor={`bg-colorBluePrimary`}
                        textColor={`text-white`}
                        onClick={handleUserDetailsUpdate}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        readOnly={currUser?.role !== "administrator"}
                        placeholder="Full Name"
                        label="Name"
                        name="name"
                        type="text"
                        value={input?.name}
                        onChange={handleChange}
                        disabled={
                          currUser.role !== "administrator" &&
                          input.id != currUser._id
                        }
                      />
                    </div>
                    <div className="w-full ml-0 lg:ml-2">
                      <Input
                        readOnly={currUser?.role !== "administrator"}
                        placeholder="Username"
                        label="Username"
                        name="username"
                        type="text"
                        value={input?.username}
                        onChange={handleChange}
                        disabled={
                          currUser.role !== "administrator" &&
                          input.id != currUser._id
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        readOnly={currUser?.role !== "administrator"}
                        placeholder="Phone Number"
                        label="Phone Number"
                        name="phoneNumber"
                        type="text"
                        value={input?.phoneNumber}
                        onChange={handleChange}
                        disabled={input.id != currUser._id}
                      />
                    </div>
                    <div className="w-full ml-0 lg:ml-2">
                      <Input
                        readOnly={currUser?.role !== "administrator"}
                        placeholder="Email"
                        label="Email Address"
                        name="email"
                        type="email"
                        value={input?.email}
                        onChange={handleChange}
                        disabled={input.id != currUser._id}
                      />
                    </div>
                  </div>
                  {(currUser?.role === "administrator" ||
                    currUser._id === input.id) && (
                    <div className="w-full lg:w-1/3 mt-4">
                      <Button
                        size="large"
                        backgroundColor={`bg-colorBluePrimary`}
                        textColor={`text-white`}
                        onClick={() => setIsModalOpen(true)}
                      >
                        Change Password
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 mt-4">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        readOnly={currUser?.role !== "administrator"}
                        placeholder="Country"
                        label="Country"
                        name="country"
                        type="text"
                        value={input?.country}
                        onChange={handleChange}
                        disabled={input.id != currUser._id}
                      />
                    </div>
                    <div className="w-full ml-0 lg:ml-2">
                      <Input
                        readOnly={currUser?.role !== "administrator"}
                        placeholder="City"
                        label="City"
                        name="city"
                        type="text"
                        value={input?.city}
                        onChange={handleChange}
                        disabled={input.id != currUser._id}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 mt-4">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        readOnly={currUser?.role !== "administrator"}
                        placeholder="Current Location"
                        label="Current Location"
                        name="location"
                        type="text"
                        value={input?.currentLocation}
                        disabled={input.id != currUser._id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center">
          <div className="w-full">
            {/* <Input
              placeholder='********'
              label='Old Password'
              name='oldPassword'
              type='password'
              value={passwordInput.oldPassword}
              // error={!passwordMatch ? "Old password is incorrect" : ""}
              onChange={handlePasswordChange}
            /> */}
          </div>
          <div className="w-full">
            <Input
              placeholder="********"
              label="New Password"
              name="newPassword"
              type="password"
              error={submitted ? "Passwords do not match" : ""}
              value={passwordInput.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="********"
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              error={submitted ? "Passwords do not match" : ""}
              value={passwordInput.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="w-full mt-2 lg:mt-4">
            <Button
              size="large"
              backgroundColor={`bg-colorBluePrimary`}
              textColor={`text-white`}
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserProfileDetails;
