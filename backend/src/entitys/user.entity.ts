import { Column, CreateDateColumn, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ROLES, SignupStatus } from "../constant/enum";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Entity()
export class User {
  @Column({ primary: true, type: "uuid" })
  id: string = uuidv4();

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

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date = new Date();
}

export default User;
