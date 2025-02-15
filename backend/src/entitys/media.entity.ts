import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Book from "./book.entity";
import Profile from "./profile.entity";

@Entity("media")
export class Media extends BaseEntity {
  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @ManyToOne(() => Book, (book) => book.media, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bookId" })
  book: Book;

  @ManyToOne(() => Profile, (profile) => profile.media, { onDelete: "CASCADE" })
  @JoinColumn({ name: "profileId" })
  profile: Profile;
}

export default Media;
