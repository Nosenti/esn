import api from "../utils/api";
import makeConfig from "../utils/helpers";
const apiUrl = import.meta.env.VITE_API_URL;

export const getSearchResults = async (key) => {
  try {
    const config = makeConfig();
    const response = await api.get(`search/${key}`, config);
    // console.log("Search results:", response);
    return response.data;
  } catch (err) {
    console.error("Error fetching search results:", err);
    throw err;
  }
};

export const getSortedUsers = async () => {
  const config = makeConfig();
  try {
    const response = await api.get(
      `${apiUrl}/api/v1/citizens?sort=-status,username&&fields=username,status,healthStatus,isActive,profilePicture`,
      config
    );
    return response.data.citizens;
  } catch (err) {
    console.error("Error fetching sorted Users:", err);
    throw err;
  }
};

export const getProfile = async (id) => {
  const config = makeConfig();
  try {
    const response = await api.get(`citizens/${id}`, config);
    console.log("Profile:", response);
    return response.data;
  } catch (err) {
    console.error("Error fetching profile:", err);
    throw err;
  }
};

export const updateProfile = async (id, data) => {
  const config = makeConfig();
  try {
    const response = await api.patch(`citizens/${id}`, data, config);
    console.log("Profile updated:", response);
    return response.data;
  } catch (err) {
    console.error("Error updating profile:", err);
    throw err;
  }
};

export const changeRole = async (userId, newRole) => {
  const config = makeConfig();
  try {
    const response = await api.patch(`citizens/${userId}/role`, newRole, config);
    console.log("rres: ", response);
    return response.data;
  } catch (error) {
    console.log("error changing role");
    throw error;
  }
}

export const changeActiveStatus = async (userId, activeStatus) => {
  const config = makeConfig();
  try {
    console.log("status changing to: ", activeStatus.isActive);
    const activeStatus_ = activeStatus.isActive;
    if(activeStatus_ === true){
      const response = await api.patch(`citizens/${userId}/active`, config);
      console.log("rres: ", response.data.message);
      return response.data;
    }
    if(activeStatus_ === false){
      const response = await api.patch(`citizens/${userId}/inactive`, config);
      console.log("rres: ", response);
      return response.data;
    }
  } catch (error) {
    console.log("error changing roles: ", error);
    throw error;
  }
}

export const updatePassword = async (id, data) => {
  const config = makeConfig();
  try {
    console.log("User ID:", id);
    console.log("Data:", data);
    const response = await api.patch(`citizens/${id}/password`, data, config);
    console.log("Password updated:", response);
    return response.data;
  } catch (err) {
    console.error("Error updating password:", err);
    throw err;
  }
};

export const updateProfilePicture = async (id, data) => {
  const config = makeConfig();
  try {
    const response = await api.patch(`citizens/${id}/profile`, data, config);
    console.log("Profile picture updated:", response);
    return response.data;
  } catch (err) {
    console.error("Error updating profile picture:", err);
    throw err;
  }
};
