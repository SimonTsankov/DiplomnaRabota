import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";
import {UserService} from "../UserService/user.service";
import {PostsServiceService} from "../../PostsComponents/posts/posts-service.service";
import {UPost} from "../../model/UPost";
import {SpotifyService} from "../../Spotify/SpotifyService/spotify.service";


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  user: User = {} as User;
  userPosts: UPost[] = [];

  constructor(private postsService: PostsServiceService,
              private router: Router,
              private userService: UserService,
              private appComponent: AppComponent,
              private spotifyService: SpotifyService) {
    this.refreshPosts()
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
    window.scroll(0, 0)
  }

  async refreshPosts() {
    this.postsService.getUsersPosts(this.user).subscribe(data => this.userPosts = data)
  }

  sendPasswordReset() {
      this.userService.doRequestPasswordReset(this.user.email)
      this.appComponent.showToast("Email has been sent!","You will recieve further information in the email", false)
  }

  updateInfo() {
    window.scroll(0, 0)
    this.userService.updateUserInfo(this.user)
    this.appComponent.showToast("Username updated","", false)
  }

  async delPost(id: any) {
    await this.postsService.deletePost(id).then(result => this.appComponent.showToast("Post was deleted succesfully", "", false));
    this.refreshPosts()
    this.appComponent.showToast("Post deleted!","Ops, you cant undo thaat", false)
  }

  async reddirectToSpotifyLogin() {
    window.open(await this.spotifyService.getReddirectUrl(), "_blank")
  }
}
