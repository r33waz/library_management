import {
  Entity,
  Column,
  CreateDateColumn,
} from "typeorm";
import { ROLES, SignupStatus } from "../constant/enum";
import { v4 as uuidv4 } from "uuid";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Entity()
export class User {
  @Column({ primary: true, type: "uuid" })
  id: string = uuidv4();

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  universityId: number;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column()
  universityCard: string;

  @Column({ type: "enum", enum: SignupStatus })
  status: SignupStatus;

  @Column({ type: "enum", enum: ROLES })
  role: ROLES;

  @Column({ type: "date" })
  lastActivityDate: Date = new Date();

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date = new Date();
}

export default User;
