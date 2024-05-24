import Citizen from "../models/Citizen.js";

const getPreferredLanguage = async (userId) => {
    try {
        const user = await Citizen.findById(userId);
        
        if (!user) {
            throw new Error("User not found");
        }

    return user.language;
  } catch (error) {
    console.error("Error retrieving preferred language:", error.message);
    return null; 
  }
};

export default getPreferredLanguage;
