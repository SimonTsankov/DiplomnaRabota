export class UPost {
  id: number | undefined;
  name: string | undefined;
  content: string | undefined;
  picByte: any;

  constructor(id: number | undefined, name: string | undefined, content: string | undefined, picByte: any) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.picByte = picByte;
  }
}
