import api from "../utils/api";

const API_ENDPOINT = "citizens";

export const getExistingUsers = async () => {
  try {
    const response = await api.get("homepage");
    console.log("existUsers: ", response);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 503) {
      return null;
    } else {
      console.error("Error fetching existing users:", err);
      throw err;
    }
  }
};

export const existingUsers = await getExistingUsers();

export const login = async (username, password, status) => {
  try {
    const response = await api.post(API_ENDPOINT, {
      username,
      password,
      status,
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      throw new Error("Invalid username or password");
    }
    return response.data;
  } catch (err) {
    console.error("Error during login:", err);
    if (err.response && err.response.status === 503) {
      return null;
    } else {
      throw err;
    }
  }
};

export const register = async (username, password) => {
  try {
    const response = await api.post(API_ENDPOINT, {
      username,
      password,
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    console.error("Error during registration:", err);
    throw err;
  }
};

export const logout = async () => {
  try {
    await api.get("logout");
    localStorage.removeItem("user");
    console.log("User logged out");
  } catch (err) {
    console.error("Error during logout:", err);
    throw err;
  }
};

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
