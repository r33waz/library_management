import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { ROLES, SignupStatus } from "../constant/enum";

class ProfileDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  fullname: string;

  @IsOptional()
  @IsString()
  universityId: string;

  @IsOptional()
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

export default ProfileDto;
