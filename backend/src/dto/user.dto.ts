import { IsDate, IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

class UserDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDate()
  lastActivityDate: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();
}

export default UserDTO;
