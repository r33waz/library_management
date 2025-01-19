import express from "express";
import authRoute from "./auth.routes";

const router = express.Router();

router.use("/api/v1", authRoute);

export default router;
