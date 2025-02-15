import { Response } from "express";
import { STATUS_CODE } from "../constant/enum";
import { uploadResult } from "../middleware/multer";

const MediaService = {
  uploadMedia: async (file: any, res: Response) => {
    if (!file) {
      // Check if file exists
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        status: STATUS_CODE.BAD_REQUEST,
        message: "No file uploaded",
      });
    }
    try {
      // Call Cloudinary upload function
      const uploadedData = await uploadResult(file);
      return res.status(STATUS_CODE.SUCCESS).json({
        status: STATUS_CODE.SUCCESS,
        message: "File uploaded successfully",
        data: uploadedData,
      });
    } catch (error) {
      console.error("Error in media upload:", error);
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "Error uploading file",
      });
    }
  },

  uploadMultipleMedia: async (files: any[], res: Response) => {},
};

export default MediaService;
