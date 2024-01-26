import fs from "fs";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dixe1p4io",
  api_key: process.env.CLOUDINARY_API_KEY || "414327275296552",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "-vKPNWG8FcDcyuP02_GJRDjCW94",
});

const storage = multer.diskStorage({
  destination: async (req, file, cd) => {
    try {
      if (!fs.existsSync(`uploads/`)) {
        fs.mkdir(`uploads/`, { recursive: true }, async (err) => {
          if (err) {
            console.error("err", err);
          }

          cd(null, `uploads/`);
        });
      } else {
        cd(null, `uploads/`);
      }
    } catch (error) {
      console.error("error", error);
    }
  },
  filename: (req, file, cd) => {
    cd(null, `${Date.now()}-${file.originalname}`);
  },
});
export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result);
    return result; // This will contain the details of the uploaded image on Cloudinary
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const upload = multer({ storage });

export default upload;
