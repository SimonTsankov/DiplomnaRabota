import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Post} from "../models/Post";
import {PostsServiceService} from "./posts-service.service";
import {UPost} from "../models/UPost";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
  allposts: Post = {} as Post;

  // @ts-ignore
  allPosts: UPost[];

  constructor(private sanitizer: DomSanitizer,private _sanitizer: DomSanitizer, private postsService: PostsServiceService) {
  }

  ngOnInit(): void {
    this.refreshPosts()
    this.postsService.getAllPosts().subscribe(data => this.allPosts = data)
  }

  async refreshPosts() {
    this.postsService.getAllPosts().subscribe(data => this.allPosts = data)
  }

  image: any

  getImagePath(picByte:any) {
    console.log(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
      + picByte.base64string))
    return  this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
      + picByte.base64string);
  }

  getHtml(content: any){
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
