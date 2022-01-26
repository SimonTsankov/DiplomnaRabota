import {Component, OnInit} from '@angular/core';
import {UserService} from "../UserService/user.service";
import {UPost} from "../../model/UPost";
import {User} from 'src/app/model/User';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users: User[] = [];
  followedUsers: User[] = [];
  searchWord: any;
  // @ts-ignore
  checked: false;

  constructor(private userService: UserService, private appCmp: AppComponent) {
  }

  ngOnInit(): void {
    this.refreshUsers()
  }


  refreshUsers() {
      this.userService.getSearchedUsers(this.searchWord)
        .subscribe(data => this.users = data)

      this.userService.getFollowed(this.searchWord).subscribe(
          data=>this.followedUsers=data)

  }

  async onUserSelect(user: User) {
    const element = document.getElementById(String(user.id))
    if (element) {
      if (element.textContent == "Follow") {
        await this.userService.followUser(user.id);
        this.appCmp.showToast(user.username, "followed", false)
        element.textContent = "Unfollow"
      } else {
        await this.userService.unfollow(user.id);
        element.textContent = "Follow"
        this.appCmp.showToast("Unfollowed " + user.username, "", true)
      }
      // await this.userService.followUser(user.id);
      // this.appCmp.showToast(user.username, "followed", false)
      // this.users.splice(this.users.indexOf(user),1);
    }
  }

  getRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return "#" + randomColor.toString();
  }
}
