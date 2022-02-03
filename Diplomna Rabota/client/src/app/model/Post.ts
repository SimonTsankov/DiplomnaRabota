import {User} from "./User";

export interface Post{
  id:number;
  name: string;
  content: string;
  picByte: any;
  user: User;
}
