import { uploadResult } from "../middleware/multer";

const MediaService = {
  // Single file upload
  uploadMedia: async (file: any) => {
    if (!file) {
      throw new Error("No file uploaded.");
    }

    try {
      // Upload file to Cloudinary
      const uploadedData = await uploadResult(file);
      return uploadedData; // Return upload data (URL, type, etc.)
    } catch (error) {
      console.error("Error in media upload:", error);
      throw new Error("Error uploading file to Cloudinary.");
    }
  },

  // Multiple file upload
  uploadMultipleMedia: async (files: any[]) => {
    if (!files || files.length === 0) {
      throw new Error("No files to upload.");
    }

    try {
      // Process each file and upload to Cloudinary
      const uploadPromises = files.map((file) => uploadResult(file));

      // Wait for all uploads to finish
      const uploadedFiles = await Promise.all(uploadPromises);

      return uploadedFiles; // Return uploaded file data
    } catch (error) {
      console.error("Error in multiple media upload:", error);
      throw new Error("Error uploading multiple files.");
    }
  },
};

export default MediaService;
