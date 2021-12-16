import {User} from "./User";

export interface Notification {
  id: number;
  userFrom: User;
  userTo: User
  content: string;
  title: string;
  link: string;
  seen:boolean
}
