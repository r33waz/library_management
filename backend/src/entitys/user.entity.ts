import { Column, Entity } from "typeorm";
import { ROLES, SignupStatus } from "../constant/enum";
import { BaseEntity } from "./base.entity";

@Entity()
export class User extends BaseEntity {
  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "university_id", unique: true })
  universityId: number;

  @Column({ type: "varchar", length: 255 })
  password: string;

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
