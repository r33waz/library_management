import { Request, Response } from "express";
import AppDataSource from "../config/db.config";
import { STATUS_CODE } from "../constant/enum";
import Media from "../entitys/media.entity";
import Profile from "../entitys/profile.entity";
import User from "../entitys/user.entity";
import { comparePassword, hashPassword } from "../helper/passwordHelper";
import { ILogin } from "../interface/auth.Interface";
import { uploadResult } from "../middleware/multer";

const userRepository = AppDataSource.getRepository(User);
const profileRepository = AppDataSource.getRepository(Profile);
const mediaRepository = AppDataSource.getRepository(Media);

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

  signUpService: async (req: Request) => {
    const { fullname, email, password, universityId } = req?.body;

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

      const existingProfile = await profileRepository.findOneBy({
        universityId,
      });
      if (existingProfile)
        return {
          status: STATUS_CODE.BAD_REQUEST,
          message: "University ID already exists",
        };

      const hashedPassword = await hashPassword(password);

      let universityCardMediaId: string | null = null;
      const files = req?.files as Express.Multer.File[];

      // Start transaction
      await AppDataSource.transaction(async (transactionalEntityManager) => {
        // Step 1: Create Profile first
        const profile = new Profile();
        profile.fullname = fullname;
        profile.universityId = universityId;
        await transactionalEntityManager.save(profile);

        // Step 2: Upload university card if available
        if (files?.length > 0) {
          const file = files[0];
          console.log("Uploading university card:", file);
          const uploadMedia = await uploadResult(file);

          if (uploadMedia) {
            const media = new Media();
            media.path = uploadMedia.url;
            media.type = uploadMedia.type;
            media.name = uploadMedia.name;
            media.profile = profile; // Link media to profile

            const savedMedia = await transactionalEntityManager.save(media);
            universityCardMediaId = savedMedia.id;

            // Step 3: Associate university card with profile
            profile.universityCard = universityCardMediaId;
            await transactionalEntityManager.save(profile);
          }
        }

        // Step 4: Create User and link Profile (via profile_id)
        const newUser = new User();
        newUser.email = email;
        newUser.password = hashedPassword;
        newUser.profile = profile; // Assign profile to user

        await transactionalEntityManager.save(newUser);
      });

      return {
        status: STATUS_CODE.SUCCESS,
        message: "User registered successfully",
      };
    } catch (error) {
      console.error("Error in signUpService:", error);
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
