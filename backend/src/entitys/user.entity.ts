import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "../constant/base.entity";
import Profile from "./profile.entity";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Entity("user")
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

export default User;
