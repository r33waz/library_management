import { Response } from "express";
import AppDataSource from "../config/db.config";
import { STATUS_CODE } from "../constant/enum";
import User from "../entitys/user.entity";
import { genAccessToken, genRefreshToken } from "../helper/genToken";
import { comparePassword, hashPassword } from "../helper/passwordHelper";
import { ILogin, ISignup } from "../interface/auth.Interface";

const userReposiotry = AppDataSource.getRepository(User);

// authService.ts
const AuthService = {
  // Login service
  loginService: async (body: ILogin, response: Response) => {
    const { email, password } = body;
    if (!email || !password) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Invalid email or password",
      };
    }

    const user = await userReposiotry.findOneBy({ email: email });
    if (!user) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "User not found",
      };
    }

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Invalid email or password",
      };
    }

    // Generating the access token
    const accessToken = genAccessToken(
      { email: user.email, id: user.id, role: user.role },
      { expiresIn: "1h" }
    );

    // Generating the refresh token
    const refreshToken = genRefreshToken(
      { email: user.email, id: user.id, role: user.role },
      { expiresIn: "7d" }
    );

    // Store the access token and refresh token in the cookies
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return {
      status: STATUS_CODE.SUCCESS,
      message: "Login successful",
    };
  },

  signUpService: async (body: ISignup) => {
    const { fullname, email, password, universityCard, universityId } = body;
    // Check if any of the required fields are missing seperately
    if (!fullname) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Fullname is required",
      };
    }
    if (!email) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Email is required",
      };
    }
    if (!password) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Password is required",
      };
    }
    if (!universityCard) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "University Card is required",
      };
    }
    if (!universityId) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "University ID is required",
      };
    }

    const user = await userReposiotry.findOneBy({
      email: email,
      universityId: universityId,
    });
    const uniqueUniversityId = await userReposiotry.findOneBy({
      universityId: universityId,
    });
    if (user) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "User already exists",
      };
    }
    if (uniqueUniversityId) {
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "University ID already exists",
      };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User();
    newUser.fullname = fullname;
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.universityCard = universityCard;
    newUser.universityId = universityId;

    await userReposiotry.save(newUser);

    return {
      status: STATUS_CODE.SUCCESS,
      message: "Signup successful",
      email,
    };
  },

  logoutService: async (response: Response) => {
    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");
    return {
      status: STATUS_CODE.SUCCESS,
      message: "Logout successful",
    };
  },
};

export default AuthService;
