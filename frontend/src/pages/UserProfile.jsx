import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import Button from "../components/Button";
import Input from "../components/Input";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import {
  updatePassword,
  updateProfile,
  getProfile,
} from "../services/AppServices";
import axios from "axios";
import api from "../utils/api";

const UserProfile = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(
    "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  );
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const [input, setInput] = useState({
    username: "",
    email: "",
    name: "",
    phoneNumber: null,
    country: "",
    city: "",
    currentLocation: "",
    role: ""
  });

  const [passwordInput, setPasswordInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const fetchProfile = async () => {
    try {
      const profile = await getProfile(userData?.user?._id);
      setInput({
        username: profile?.username || "",
        email: profile?.email|| "",
        name: profile?.name || "",
        country: profile?.country || "",
        city: profile?.city || "",
        currentLocation: profile?.currentLocation || "",
        phoneNumber: profile?.phoneNumber || "",
        role: profile?.role || "",
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

  const handleUpdatePassword = async () => {
    try {
      if (passwordInput.newPassword !== passwordInput.confirmPassword) {
        setSubmitted(true);
        return;
      }
      if (userData) {
        console.log("User ID:", userData?.user?._id);
        console.log("Password input:", passwordInput);
        const response = await updatePassword(userData?.user?._id, {
          newPassword: passwordInput?.newPassword,
        });
        console.log("Password updated:", response);
        toast.success("Password updated successfully");
      }

      setPasswordInput({
       
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
      if (userData) {
        console.log("User ID:", userData?.user?._id);
        console.log("User input:", input);
        const response = await updateProfile(userData?.user?._id, input);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Profile update failed");
    }
  };

  function handleLocationClick() {
    console.log("inside loca");
    if (navigator.geolocation) {
      console.log("location: ", navigator.geolocation);
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    setInput((prevInput) => ({
      ...prevInput,
      currentLocation: `Latitude: ${latitude}, Longitude: ${longitude}`,
    }));
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: "5db307191d9c5cd2a036216d6ae0b0e6",
          units: "metric",
        },
      })
      .then((response) => {
        const data = response.data;
        setWeather(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleImageUpload = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.patch(
        `/citizens/${userData?.user?._id}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded:", response.data);
      toast.success("Image uploaded successfully");
      setIsLoading(false);
      fetchProfile();
      setIsProfileModalOpen(false);
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Image upload failed");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="p-4 bg-white fixed w-full z-10">
          <h2 className="">Profile Information</h2>
        </nav>
        <div className="w-full h-full p-4">
          <div className="w-full bg-transparent lg:bg-white py-4 px-8 mt-10 lg:mt-14 rounded-md">
            <h3 className="font-semibold">Profile</h3>
            <div className="flex flex-col lg:flex-row mt-8 items-start justify-between">
              <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                <div className="relative w-36 lg:w-48 overflow-hidden rounded-full">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="absolute bottom-0 flex items-center text-xs py-2 lg:py-4 justify-center w-full h-6 lg:h-8 bg-gray-800 text-white"
                  >
                    Edit image
                  </button>
                  <img
                    className="w-36 h-36 lg:w-48 lg:h-48 rounded-full object-cover"
                    src={
                      !file
                        ? "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        : file
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex flex-row justify-between items-center">
                  <div className="mb-4 lg:mb-0">Personal Information</div>
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
                </div>
                <div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        placeholder="Full Name"
                        label="Name"
                        name="name"
                        type="text"
                        value={input?.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full ml-0 lg:ml-2">
                      <Input
                        placeholder="Username"
                        label="Username"
                        name="username"
                        type="text"
                        value={input?.username}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        placeholder="Phone Number"
                        label="Phone Number"
                        name="phoneNumber"
                        type="text"
                        value={input?.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full ml-0 lg:ml-2">
                      <Input
                        placeholder="Email"
                        label="Email Address"
                        name="email"
                        type="email"
                        value={input?.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

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
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 mt-4">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        placeholder="Country"
                        label="Country"
                        name="country"
                        type="text"
                        value={input?.country}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full ml-0 lg:ml-2">
                      <Input
                        placeholder="City"
                        label="City"
                        name="city"
                        type="text"
                        value={input?.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 mt-4">
                    <div className="w-full mr-0 lg:mr-2">
                      <Input
                        placeholder="Current Location"
                        label="Current Location"
                        name="location"
                        type="text"
                        value={input?.currentLocation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full ml-0 lg:ml-2 mt-2 lg:mt-4">
                      <Button
                        size="large"
                        backgroundColor={`bg-colorBluePrimary`}
                        textColor={`text-white`}
                        onClick={handleLocationClick}
                      >
                        Get Current Location
                      </Button>
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
              placeholder="********"
              label="Old Password"
              name="oldPassword"
              type="password"
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
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      >
        <h2>Account Profile Picture</h2>
        <div className="relative w-36 lg:w-48 overflow-hidden rounded-full">
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageSelection}
            className="absolute inset-0 opacity-0"
          />
          {isLoading ? (
            <div></div>
          ) : (
            <div>
              <button className="absolute bottom-0 flex items-center text-xs py-2 lg:py-4 justify-center w-full h-6 lg:h-8 bg-gray-800 text-white">
                Upload image
              </button>
              <img
                className="w-36 h-36 lg:w-48 lg:h-48 rounded-full object-cover"
                src={file ? file : preview}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="mt-6 justify-center self-center">
          {isLoading ? (
            <BeatLoader color="#123abc" />
          ) : (
            <Button
              size="medium"
              backgroundColor={`bg-colorBluePrimary`}
              textColor={`text-white`}
              onClick={handleImageUpload}
            >
              Update Profile Picture
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;
