import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config(); // Must be at the top

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_SECRETE,
});

export default cloudinary;