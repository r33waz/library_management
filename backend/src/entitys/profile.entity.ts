import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ROLES, SignupStatus } from "../constant/enum";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @Column({ name: "last_activity_date", type: "date" })
  lastActivityDate: Date = new Date();

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date = new Date();
}

export default Profile;
