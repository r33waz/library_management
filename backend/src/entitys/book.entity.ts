import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import Media from "./media.entity";

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

  @OneToMany(() => Media, (media) => media.book)
  media: Media[];
}

export default Book;
