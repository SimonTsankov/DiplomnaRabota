import {User} from "./User";

export class UPost {
  id: number | undefined;
  name: string | undefined;
  content: string | undefined;
  picByte: any;
  user: User;

  constructor(user: User,id: number | undefined, name: string | undefined, content: string | undefined, picByte: any) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.content = content;
    this.picByte = picByte;
  }
}
