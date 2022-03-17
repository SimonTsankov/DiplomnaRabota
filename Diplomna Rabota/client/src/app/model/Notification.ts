import {User} from "./User";
import {Song} from "./Song";

export interface Notification {
  id: number;
  user: User;
  title: string;
  message: string;
  seen:boolean
  song: Song;
}
