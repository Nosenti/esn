import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: "auto",
      overwrite: true,
      invalidate: true,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export { cloudinary, uploadToCloudinary };
