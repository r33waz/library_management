import { Column, Entity, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { ROLES, SignupStatus } from "../constant/enum";
import Media from "./media.entity";

@Entity("profile")
export class Profile extends BaseEntity {
  @Column()
  fullname: string;

  @Column({ name: "university_id", unique: true, default: null })
  universityId: string;

  @OneToOne(() => Media, (media) => media.universityCard, { cascade: true })
  universityCard: Media;

  @OneToOne(() => Media, (media) => media.profilepic, { nullable: true })
  profilepic: Media;

  @Column({
    name: "status",
    type: "enum",
    enum: SignupStatus,
    default: SignupStatus.PENDING,
  })
  status: SignupStatus;

  @Column({ name: "role", type: "enum", enum: ROLES, default: ROLES.USER })
  role: ROLES;
}

export default Profile;
