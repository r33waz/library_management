import { IsEmail, IsNotEmpty } from "class-validator";

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
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsNotEmpty()
  universityCard: string;

  @IsNotEmpty()
  @IsNotEmpty()
  universityId: number;
}

class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export { ForgotPasswordDto, LoginDto, SignupDto };
