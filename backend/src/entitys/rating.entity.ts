import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Book from "./book.entity";
import User from "./user.entity";

@Entity("rating")
export class Rating extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @ManyToOne(() => Book)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}

export default Rating;
