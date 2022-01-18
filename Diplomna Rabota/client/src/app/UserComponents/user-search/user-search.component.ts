import { Component, OnInit } from '@angular/core';
import {UserService} from "../UserService/user.service";
import {UPost} from "../../model/UPost";
import { User } from 'src/app/model/User';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users: User[] = [];
  searchWord: any;
  // @ts-ignore
  checked: true;
  constructor(private userService: UserService,private appCmp: AppComponent) { }

  ngOnInit(): void {
    this.refreshUsers()
    console.log(this.users.length)
  }

  refreshUsers(){
    this.userService.getSearchedUsers(this.searchWord)
      .subscribe(data => this.users = data)
  }

  onUserSelect(user: User) {
    this.appCmp.showToast(user.username,"",false)
  }

  getRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return  "#"+randomColor.toString();
  }
}
