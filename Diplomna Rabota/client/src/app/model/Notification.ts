import {User} from "./User";
import {Song} from "./Song";

export interface Notification {
  id: number;
  title: string;
  message: string;
  seen:boolean
  song: Song;
}
