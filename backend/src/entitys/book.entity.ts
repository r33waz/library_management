import { Column, Entity } from "typeorm";
import BaseEntity from "../constant/base.entity";

@Entity("book")
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column()
  rating: number;

  @Column()
  coverImage: string;

  @Column()
  coverColor: string;

  @Column()
  description: string;

  @Column()
  totalCopies: number;

  @Column()
  availableCopies: number;

  @Column()
  videoUrl: string;

  @Column()
  summary: string;
}

export default Book;
