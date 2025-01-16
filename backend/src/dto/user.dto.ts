import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  IsEnum,
  Matches,
  IsDate,
} from "class-validator";
import { ROLES, SignupStatus } from "../constant/enum";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
class UserDTO {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  universityId: number;

  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, {
    message:
      "Confirm password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  universityCard: string;

  @IsNotEmpty()
  @IsEnum(SignupStatus)
  status: SignupStatus;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @IsDate()
  lastActivityDate: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();
}
