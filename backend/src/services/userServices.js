import Citizen from "../models/Citizen.js";
// import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

class UserService {
  static async updateCitizen(id, updateData) {
    const citizen = await Citizen.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: false,
    });

    if (!citizen) {
      throw new Error("Citizen not found");
    }

    return citizen;
  }
  static async updateCitizenRole(id, newRole) {
    const update = { role: newRole }; 
    const citizen = await Citizen.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!citizen) {
      throw new Error("Citizen not found");
    }

    return citizen;
  }

  static async getCitizen(id) {
    const citizen = await Citizen.findById(id);
    if (!citizen) {
      throw new Error("Citizen not found");
    }
    return citizen;
  }

  static async updatePassword(id, newPassword) {
    const citizen = await Citizen.findById(id);
    if (!citizen) {
      throw new Error("Citizen not found");
    }

    citizen.password = newPassword;
    const savedCitizen = await citizen.save();
    if (!savedCitizen) {
      throw new Error("Failed to save citizen");
    }

    return savedCitizen;
  }
  static async updateProfilePicture(id, file) {
    //   const citizen = await Citizen.findById(id);
    //   if (!citizen) {
    //     throw new Error("Citizen not found");
    //   }
    //   cloudinary.config({
    //     cloud_name: process.env.CLOUD_NAME,
    //     api_key: process.env.CLOUD_API_KEY,
    //     api_secret: process.env.CLOUD_API_SECRET,
    //   });
    //   // If there's an existing profile picture, delete it
    //   if (citizen.profilePicture) {
    //     const imageUrl = citizen.profilePicture;
    //     const imageId = imageUrl.split("/").pop().split(".")[0];
    //     await cloudinary.uploader.destroy(imageId);
    //   }
    //   // Upload the new profile picture
    //   const response = await cloudinary.uploader.upload(file.path, {
    //     width: 200,
    //     height: 200,
    //     crop: "scale",
    //   });
    //   // Update the profilePicture field with the new image URL
    //   citizen.profilePicture = response.secure_url;
    //   await citizen.save();
    //   return citizen;
    // }
    // const citizen = await Citizen.findByIdAndUpdate(id, fil);
  }
}
export default UserService;
