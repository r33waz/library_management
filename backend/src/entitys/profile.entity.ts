import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { ROLES, SignupStatus } from "../constant/enum";
import Media from "./media.entity";

@Entity("profile")
export class Profile extends BaseEntity {
  @Column()
  fullname: string;

  @Column({ name: "university_id", unique: true, default: null })
  universityId: number;

  @Column({ name: "university_card", type: "text", default: null })
  universityCard: string;

  @Column({
    name: "status",
    type: "enum",
    enum: SignupStatus,
    default: SignupStatus.PENDING,
  })
  status: SignupStatus;

  @Column({ name: "role", type: "enum", enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @OneToMany(() => Media, (media) => media.profile, { cascade: true })
  media: Media[];
}

export default Profile;
