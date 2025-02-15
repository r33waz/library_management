import { Request, Response } from "express";
import mediaService from "../service/media.service";

const MediaController = {
  uploadMedia: async (req: Request, resp: Response) => {
    try {
      const result = await mediaService.uploadMedia(req, resp);
      resp.status(result.statusCode).json({
        status: result.statusCode,
        message: result?.statusMessage,
      }); /
    } catch (error) {
      resp.status(500).json({
        status: 500,
        message: "Error occurred during file upload",
      });
    }
  },
};

export default MediaController;
