import exporess from "express";
import authController from "../controller/auth.controller";
import { LoginDto, SignupDto } from "../dto/auth.dto";
import { validateDto } from "../middleware/RequestValidator";

const router = exporess.Router();
router.post("/auth/login", validateDto(LoginDto), authController.login);
router.post("/auth/signup", validateDto(SignupDto), authController.signup);
router.post("/auth/logout", authController.logout);

export default router;
