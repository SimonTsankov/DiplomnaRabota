import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {AppComponent} from "../app.component";
import * as imageConversion from 'image-conversion';
// @ts-ignore
import {PostTransportModel} from "../model/PostTransportModel";


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  post: PostTransportModel = {} as PostTransportModel
  selectedFile: Blob | undefined
  postSaveUrl = "http://localhost:4713/sl/api/post/save"
  name = ""
  content = ""
  imagepath = ""
  url: string | ArrayBuffer | null = 'https://lh3.googleusercontent.com/proxy/56yAxYAY4xpP8ljDCrwSJDqpEYpMdYQ7fxb09EmUHF3sbnI5-PXrPNCKrGKPpcnCjEnHVgH_Qqf-4tV6QH6k6fKz9Os_54WhtTkZB-QXjw';
  text: string = "";


  editorConfig: AngularEditorConfig = {
    editable: true,
    height: "320px",
    maxHeight: "920px",
    outline: true,
    defaultFontSize: '4',
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode',
        'strikeThrough',
        'underline',
        'heading'
      ]
    ]
  };
  values2: string[] | undefined;

  constructor(private appCmp: AppComponent, private http: HttpClient) {

  }

  ngOnInit(): void {
    console.log(this.url)
  }

  async onFileSelected(event: Event) {
    // @ts-ignore
    let file = <File>event.target.files[0]
    if (!file.type.includes("image/")) {
      this.appCmp.showToast("Not an image type", "Please select png/jpeg/gif", true)
      return
    }
    console.log(file.size)
    this.selectedFile = file;
    if (file.size > 1048576) {
      const res = await imageConversion.compressAccurately(file, 900)
      this.selectedFile = res;
      // var reader = new FileReader();
      // reader.readAsDataURL(res);
      // reader.onload = (event) => {
      //   // @ts-ignore
      //   this.url = event.target.result;
      // }
      // return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (event) => {
      // @ts-ignore
      this.url = event.target.result;
    }
  }

  onUpload() {
    const uploadImageData = new FormData();

    if (this.selectedFile == null) {
      this.appCmp.showToast("Image is required", "", true)
      return
    }

    // @ts-ignore
    uploadImageData.append('file', this.selectedFile, "")


    this.post.file = this.selectedFile
    this.post.name = this.name
    this.post.content = this.text;
    this.http.post(this.postSaveUrl, this.post, {responseType: "text"}).toPromise()
  }

  filterCountry($event: any) {

  }

  show() {
    console.log(this.text)
  }

  themeChange() {
    console.log("Changed theme")
  }
}

