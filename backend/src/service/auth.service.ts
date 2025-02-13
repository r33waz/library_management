import { Response } from "express";
import AppDataSource from "../config/db.config";
import { STATUS_CODE } from "../constant/enum";
import Profile from "../entitys/profile.entity";
import User from "../entitys/user.entity";
import { comparePassword, hashPassword } from "../helper/passwordHelper";
import { ILogin, ISignup } from "../interface/auth.Interface";

const userRepository = AppDataSource.getRepository(User);
const profileRepository = AppDataSource.getRepository(Profile);

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

    const user = await userRepository.findOneBy({ email: email });
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
    // const accessToken = genAccessToken(
    //   { email: user.email, id: user.id, role: user.role },
    //   { expiresIn: "1h" }
    // );

    // Generating the refresh token
    // const refreshToken = genRefreshToken(
    //   { email: user.email, id: user.id, role: user.role },
    //   { expiresIn: "7d" }
    // );

    // Store the access token and refresh token in the cookies
    // response.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    // });
    // response.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    // });

    return {
      status: STATUS_CODE.SUCCESS,
      message: "Login successful",
    };
  },

  signUpService: async (body: ISignup) => {
    const { fullname, email, password, universityCard, universityId } = body;

    // Validate required fields
    if (!fullname)
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Fullname is required",
      };
    if (!email)
      return { status: STATUS_CODE.BAD_REQUEST, message: "Email is required" };
    if (!password)
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "Password is required",
      };
    if (!universityCard)
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "University Card is required",
      };
    if (!universityId)
      return {
        status: STATUS_CODE.BAD_REQUEST,
        message: "University ID is required",
      };

    try {
      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser)
        return {
          status: STATUS_CODE.BAD_REQUEST,
          message: "User already exists",
        };

      const existingUniversityId = await profileRepository.findOneBy({
        universityId,
      });
      if (existingUniversityId)
        return {
          status: STATUS_CODE.BAD_REQUEST,
          message: "University ID already exists",
        };

      const hashedPassword = await hashPassword(password);

      const profile = new Profile();
      profile.fullname = fullname;
      profile.universityCard = universityCard;
      profile.universityId = universityId;

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.profile = profile;

      await AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(profile);
        await transactionalEntityManager.save(newUser);
      });

      return {
        status: STATUS_CODE.SUCCESS,
        message: "User registered successfully",
      };
    } catch (error) {
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "Error creating user",
      };
    }
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
