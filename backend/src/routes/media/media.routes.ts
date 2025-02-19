import express from "express";
import MediaController from "../../controller/media.controller";
import { uploads } from "../../middleware/multer";

const router = express.Router();
router.post("/uploads", uploads.array("files"), MediaController.uploadMedia);

export default router;
