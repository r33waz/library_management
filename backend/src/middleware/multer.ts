import { Request } from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // store in memory
    cb(null, "");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// File validation (only allow image and video types)
const validateFile = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Set up multer with storage and validation
const uploads = multer({
  storage,
  fileFilter: validateFile,
});

// Cloudinary upload function
const uploadResult = async (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("No file uploaded.");
  }

  try {
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path);
    console.log("🚀 ~ uploadResult ~ uploadResult:", uploadResult);

    return {
      url: uploadResult.secure_url, // URL of the uploaded file
      type: uploadResult.format, // MIME type (e.g., jpg, mp4, etc.)
      name: uploadResult.original_filename, // Original file name
      mimeType: uploadResult.mimeType,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Error uploading to Cloudinary");
  }
};

export { uploadResult, uploads };
