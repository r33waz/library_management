import { NextFunction, Response } from "express";
import { ROLES, STATUS_CODE } from "../constant/enum";
import { verifyToken } from "../helper/genToken";
import {
  AuthenticatedRequest,
  JwtPayloadWithId,
} from "../interface/auth.Interface";

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      res
        .status(STATUS_CODE?.UNAUTHORIZED)
        .json({ message: "Unauthorized - No access token" });
      return;
    }

    try {
      // Verify access token and decode it
      const decoded = verifyToken(accessToken, process.env.ACCESS_TOKEN);

      // Attach the decoded token to the request object
      req.user = decoded as JwtPayloadWithId;
      // Now `decoded` is correctly typed as JwtPayloadWithId
      next(); // Proceed to the next middleware
    } catch (error: any) {
      res.status(401).json({ message: "Unauthorized - Invalid access token" });
      return;
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

// Middleware to authorize user based on role
export const authorizeUser = (roles: ROLES[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (userRole && roles.includes(userRole as ROLES)) {
      return next();
    }

    res.status(403).json({ message: "Forbidden - Insufficient permissions" });
  };
};
