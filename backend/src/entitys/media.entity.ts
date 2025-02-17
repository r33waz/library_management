import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { MEDIA_TYPE } from "../constant/enum";
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

  @Column({ type: "enum", enum: MEDIA_TYPE, default: null })
  mediaType: string;

  @ManyToOne(() => Book, (book) => book.media, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bookId" })
  book: Book;

  @OneToOne(() => Profile, (profile) => profile.profilepic, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profileId" })
  profilepic: Profile;

  @OneToOne(() => Profile, (profile) => profile.universityCard)
  @JoinColumn({ name: "universityCardId" })
  universityCard: Profile;
}

export default Media;
