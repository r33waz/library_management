export interface ISignup {
  fullname: string;
  email: string;
  password: string;
  universityCard: string;
  universityId: number;
  status: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}
