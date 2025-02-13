import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Profile from "./profile.entity";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import { Column, Entity } from "typeorm";
import { ROLES, SignupStatus } from "../constant/enum";
import { BaseEntity } from "./base.entity";

@Entity("user")
export class User extends BaseEntity {
@Entity()
export class User extends BaseEntity {
  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
  @Column({ name: "university_card", type: "text" })
  universityCard: string;

  @Column({ type: "enum", enum: SignupStatus, default: SignupStatus.PENDING })
  status: SignupStatus;

  @Column({ type: "enum", enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @Column({ name: "last_activity_date", type: "date" })
  lastActivityDate: Date = new Date();
}

export default User;
