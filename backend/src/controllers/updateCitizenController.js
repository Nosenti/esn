import Citizen from "../models/Citizen.js";
import UserService from "../services/userServices.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

class updateCitizenController {
  static async getCitizen(req, res) {
    try {
      const citizen = await UserService.getCitizen(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          citizen,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  static async updateCitizenData(req, res) {
    try {
      const citizen = await UserService.updateCitizen(req.params.id, req.body);
      res.status(200).json({
        status: "success",
        data: {
          citizen,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async updateCitizenRole(req, res) {
    try {
      const { role } = req.body;
    if (!role) {
      return res.status(400).json({
        status: "error",
        message: "Role is required",
      });
    }
      const citizen = await UserService.updateCitizenRole(req.params.id, role);
      res.status(200).json({
        status: "success",
        data: {
          citizen,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  static async updateCitizenPassword(req, res) {
    try {
      console.log("Request body:", req.body);
      console.log("User ID:", req.params.id);
      const { oldPassword, newPassword } = req.body;
      const citizen = await UserService.updatePassword(
        req.params.id,
        newPassword,
      );
      res.status(200).json({
        status: "success",
        data: {
          citizen,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async updateCitizenProfilePicture(req, res) {
    try {
      const citizen = await Citizen.findById(req.params.id);
      if (!citizen) {
        return res.status(404).json({
          status: "error",
          message: "Citizen not found!",
        });
      }

      if (req.file) {
        // Upload Image to Cloudinary
        const result = await uploadToCloudinary(req.file.path, "image");

        // Update citizen with new imageUrl and publicId
        citizen.profilePicture = result.secure_url;
        citizen.cloudinary_id = result.public_id;
        await citizen.save();

        res.status(200).json({
          status: "success",
          message: "User image uploaded with success!",
          data: citizen,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "No file uploaded",
        });
      }
    } catch (e) {
      res.status(400).json({
        status: "error",
        message: e.message,
      });
    }
  }
}

export default updateCitizenController;
