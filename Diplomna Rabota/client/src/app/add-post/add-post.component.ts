import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  selectedFile: File | undefined
  postSaveUrl = "http://localhost:4713/sl/api/post/save"
  name = ""
  content = ""
  imagepath = ""
  url = '';
  fields = [{name: ""}, {content: ""}];
  text: string = "dw";


  editorConfig: AngularEditorConfig = {
    editable: true,
    height:"320px",
    outline: true,
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo']
    ]
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.url)
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (event) => {
      // @ts-ignore
      this.url = event.target.result;
    }

  }


  onUpload() {
    const uploadImageData = new FormData();

    // @ts-ignore
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name)
    uploadImageData.append('name', this.name);
    uploadImageData.append('content', this.content);

    this.http.post(this.postSaveUrl, uploadImageData).subscribe(
      res => console.log("Done!")
    )

  }

  filterCountry($event: any) {

  }

  show() {
    console.log(this.text)
  }
}

