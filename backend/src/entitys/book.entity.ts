import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("book")
export class Book {
  @Column({ primary: true, type: "uuid" })
  id: string = uuidv4();

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
