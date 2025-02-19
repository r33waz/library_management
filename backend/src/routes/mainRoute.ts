import express from "express";
import adminRoute from "./admin_routes/admin.routes";
import authRoute from "./auth_routes/auth.routes";
import mediaRoute from "./media/media.routes";

const router = express.Router();

router.use("/api/v1", authRoute);
router.use("/api/v1", adminRoute);
router.use("/api/v1", mediaRoute);

export default router;
