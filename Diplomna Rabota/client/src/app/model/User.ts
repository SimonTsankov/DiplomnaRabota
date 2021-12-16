export interface User {
  id: number;
  email: string;
  username: string
  password: string;
  emailVerification: boolean;
  dateCreated: Date;
}
