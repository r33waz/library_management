import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies?.accessToken;
    console.log("🚀 ~ accessToken:", accessToken);
    const refreshToken = req.cookies?.refreshToken;
    console.log("🚀 ~ refreshToken:", refreshToken);

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized - No access token" });
      return;
    }

    try {
      // Verify access token
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN as string
      ) as {
        id: string;
        email: string;
        role: string;
      };

      req.user = {
        id: decoded.id,
      }; // Attach user info
      next(); // Ensure we always return next() when successful
    } catch (error: any) {
      //   if (error.name === "TokenExpiredError" && refreshToken) {
      //     // If access token is expired, try refreshing it
      //     const newAccessToken = await refreshAccessToken(refreshToken);
      //     if (!newAccessToken) {
      //       res
      //         .status(401)
      //         .json({ message: "Unauthorized - Invalid refresh token" });
      //       return;
      //     }

      //     res.cookie("accessToken", newAccessToken, { httpOnly: true });

      //     // Verify new access token
      //     const decoded = jwt.verify(
      //       newAccessToken,
      //       process.env.ACCESS_TOKEN as string
      //     ) as {
      //       id: string;
      //       email: string;
      //       role: string;
      //     };

      //     req.user = decoded;
      //     return next();
      //   }

      res.status(401).json({ message: "Unauthorized - Invalid access token" });
      return;
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

// Function to refresh access token (replace with actual logic)
// const refreshAccessToken = async (
//   refreshToken: string
// ): Promise<string | null> => {
//   try {
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN as string
//     ) as { id: string; email: string; role: string };

//     // Generate new access token
//     return jwt.sign(
//       { id: decoded.id, email: decoded.email, role: decoded.role },
//       process.env.ACCESS_TOKEN as string,
//       { expiresIn: "5m" }
//     );
//   } catch (error) {
//     console.error("Failed to refresh access token:", error);
//     return null;
//   }
// };

export default authenticateUser;
