import { Request, Response } from "express";
import authService from "../service/auth.service";

const AuthController = {
  // Login handler
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await authService.loginService(req.body, res);
      res.status(result?.status || 200).json({
        status: result?.status,
        message: result?.message,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Signup handler
  signup: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await authService.signUpService(req);
      res.status(result?.status || 200).json({
        status: result?.status,
        message: result?.message,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Forgot Password handler
  forgotPassword: async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    res.send(`Forgot Password logic here for email: ${email}`);
  },

  // Reset Password handler
  resetPassword: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    res.send(`Reset Password logic here for email: ${email}`);
  },

  // Change Password handler
  changePassword: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    res.send(`Change Password logic here for email: ${email}`);
  },

  // Logout handler
  logout: async (req: Request, res: Response): Promise<void> => {
    const result = await authService.logoutService(res);
    res.status(result?.status || 200).json({
      status: result?.status,
      message: result?.message,
    });
  },

  // Refresh Token handler
  refreshToken: async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    res.send(`Refresh Token logic here for email: ${email}`);
  },

  // Get User Info handler
  me: async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    res.send(`User info logic here for email: ${email}`);
  },
};

export default AuthController;
