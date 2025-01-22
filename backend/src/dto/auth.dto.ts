import { IsEmail, IsInt, IsNotEmpty } from "class-validator";

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
}

class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  universityCard: string;

  @IsNotEmpty()
  @IsInt()
  universityId: number;
}

class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export { ForgotPasswordDto, LoginDto, SignupDto };
