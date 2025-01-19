import { IsInt, IsNotEmpty, IsUUID } from "class-validator";

class BookDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsNotEmpty()
  coverImage: string;

  @IsNotEmpty()
  coverColor: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  totalCopies: number;

  @IsNotEmpty()
  @IsInt()
  availableCopies: number;

  @IsNotEmpty()
  videoUrl: string;

  @IsNotEmpty()
  summary: string;
  createdAt: Date = new Date();
}
