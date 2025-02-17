import "dotenv/config";
import { Request, Response } from "express";
import AppDataSource from "../config/db.config";
import { MEDIA_TYPE, STATUS_CODE } from "../constant/enum";
import Media from "../entitys/media.entity";
import Profile from "../entitys/profile.entity";
import User from "../entitys/user.entity";
import { genAccessToken, genRefreshToken } from "../helper/genToken";
import { comparePassword, hashPassword } from "../helper/passwordHelper";
import { ILogin } from "../interface/auth.Interface";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import MediaService from "./media.service";

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
    const accessToken = genAccessToken({
      email: user.email,
      id: user.id,
      role: user.profile?.role,
    });

    // Generating the refresh token
    const refreshToken = genRefreshToken({
      email: user.email,
      id: user.id,
      role: user.profile?.role,
    });

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

  signUpService: async (req: Request) => {
    const { fullname, email, password, universityId, mediaType } = req?.body;

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
      let uploadedMediaUrl: string | null = null;
      let uploadedMediaPublicId: string | null = null;
      const files = req?.files as Express.Multer.File[];

      await AppDataSource.transaction(async (transactionalEntityManager) => {
        const profile = new Profile();
        profile.fullname = fullname;
        profile.universityId = universityId;
        await transactionalEntityManager.save(profile);

        if (files?.length > 0) {
          const file = files[0];
          const uploadMedia = await MediaService.uploadMedia(file);

          if (uploadMedia) {
            uploadedMediaUrl = uploadMedia?.url;
            uploadedMediaPublicId = uploadMedia.public_id; // Save the public ID for deletion

            const media = new Media();
            media.path = uploadMedia.url;
            media.type = uploadMedia.type;
            media.name = uploadMedia.name;
            media.mediaType = mediaType;

            const savedMedia = await transactionalEntityManager.save(media);
            console.log(
              "🚀 ~ awaitAppDataSource.transaction ~ savedMedia:",
              savedMedia
            );
            if (mediaType === MEDIA_TYPE.UNIVERSITY_CARD) {
              profile.universityCard = savedMedia;
            }
            if (mediaType === MEDIA_TYPE.PROFILE) {
              profile.profilepic = savedMedia;
            }
            await transactionalEntityManager.save(profile);
            // profile.universityCard.id = universityCardMediaId;
            await transactionalEntityManager.save(profile);
          }
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = hashedPassword;
        newUser.profile = profile;
        await transactionalEntityManager.save(newUser);
      });

      return {
        status: STATUS_CODE.SUCCESS,
        message: "User registered successfully",
      };
    } catch (error) {
      console.error("Error in signUpService:", error);
      // if (universityCardMediaId) {
      // }

      // Delete uploaded file from Cloudinary if transaction fails
      // if (uploadedMediaPublicId) {
      //   try {
      //     await cloudinary.uploader.destroy(uploadedMediaPublicId);
      //     console.log(
      //       "Deleted uploaded media from Cloudinary:",
      //       uploadedMediaPublicId
      //     );
      //   } catch (cloudinaryError) {
      //     console.error(
      //       "Error deleting file from Cloudinary:",
      //       cloudinaryError
      //     );
      //   }
      // }

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

  me: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req?.user) {
        const user = await AppDataSource.getRepository(User)
          .createQueryBuilder("user")
          .leftJoin("user.profile", "profile") // Joins profile and selects the fields from profile
          .addSelect([
            "profile.fullname",
            "profile.universityId",
            "profile.universityCard",
            "profile.status",
            "profile.role",
            "profile.profileId",
          ])
          .leftJoin("profile.universityCard", "universityCard")
          .addSelect([
            "universityCard.id",
            "universityCard.path",
            "universityCard.mediaType",
          ])

          .leftJoin("profile.profilepic", "profilepic")
          .addSelect([
            "profilepic.id",
            "profilepic.path",
            "profilepic.mediaType",
          ])
          .getOne();

        console.log("🚀 ~ user:", user);
        return {
          status: STATUS_CODE.SUCCESS,
          message: "User registered successfully",
          data: user,
        };
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default AuthService;
