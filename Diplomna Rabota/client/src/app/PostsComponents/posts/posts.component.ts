import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Post} from "../../model/Post";
import {PostsServiceService} from "./posts-service.service";
import {UPost} from "../../model/UPost";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthenticationService} from "../../authentication/AuthServices/authService/authentication.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
  allposts: Post = {} as Post;

  allPosts: UPost[] = [];
  constructor(private authService: AuthenticationService,private sanitizer: DomSanitizer,private _sanitizer: DomSanitizer, private postsService: PostsServiceService) {
  }

  ngOnInit(): void {
    this.refreshPosts()
  }

  async refreshPosts() {
    this.postsService.getAllPosts().subscribe(data => this.allPosts = data)
  }

  image: any
  isAdmin=this.authService.isAdmin();
  username = this.authService.getUsername();

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
