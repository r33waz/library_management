import { Request, Response } from "express";
import MediaService from "../service/media.service";

const MediaController = {
  uploadMedia: async (req: Request, resp: Response) => {
    try {
      const result = await MediaService.uploadMedia(
        req.files,
        req.body.mediaType
      );
      console.log("🚀 ~ uploadMedia: ~ result:", result.data);
      resp.status(result.statusCode).json({
        status: result.statusCode,
        data: result.data,
      });
    } catch (error) {
      console.log("🚀 ~ uploadMedia: ~ error:", error);
      resp.status(500).json({
        status: 500,
        message: "Error occurred during file upload",
      });
    }
  },
};

export default MediaController;
