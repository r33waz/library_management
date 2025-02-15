import exporess from "express";
import authController from "../controller/auth.controller";
import { LoginDto } from "../dto/auth.dto";
import { validateDto } from "../middleware/RequestValidator";
import { uploads } from "../middleware/multer";

const router = exporess.Router();
router.post("/auth/login", validateDto(LoginDto), authController.login);
router.post(
  "/auth/signup",
  // validateDto(SignupDto),
  uploads.array("file"),
  authController.signup
);
router.post("/auth/logout", authController.logout);

export default router;
