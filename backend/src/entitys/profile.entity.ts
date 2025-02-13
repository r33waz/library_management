import { Column, Entity } from "typeorm";
import BaseEntity from "../constant/base.entity";
import { ROLES, SignupStatus } from "../constant/enum";

@Entity("profile")
export class Profile extends BaseEntity {
  @Column()
  fullname: string;

  @Column({ name: "university_id", unique: true })
  universityId: number;

  @Column({ name: "university_card", type: "text" })
  universityCard: string;

  @Column({ type: "enum", enum: SignupStatus, default: SignupStatus.PENDING })
  status: SignupStatus;

  @Column({ type: "enum", enum: ROLES, default: ROLES.USER })
  role: ROLES;
}

export default Profile;
