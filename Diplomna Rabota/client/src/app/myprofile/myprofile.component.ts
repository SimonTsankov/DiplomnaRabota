import {Component, OnInit} from '@angular/core';
import {User} from "../model/User";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {Post} from "../models/Post";
import {PostsServiceService} from "../posts/posts-service.service";
import {UPost} from "../models/UPost";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  user: User = {} as User;
  userPosts: UPost[] = [];

  constructor(private postsService: PostsServiceService, private router: Router, private userService: UserService, private appComponent: AppComponent) {
    this.refreshPosts()

  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
    window.scroll(0,0)
    console.log("dwddw")
  }
  async refreshPosts() {
    this.postsService.getUsersPosts(this.user).subscribe(data => this.userPosts = data)
  }
  sendPasswordReset() {

  }

  updateInfo() {
    window.scroll(0,0)
    // this.userService.updateUserInfo(this.user)
  }
}