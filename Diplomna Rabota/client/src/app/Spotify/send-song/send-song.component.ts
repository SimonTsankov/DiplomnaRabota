import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {StepsModule} from 'primeng/steps'
import {User} from "../../model/User";
import {UserService} from "../../UserComponents/UserService/user.service";
import {AppComponent} from "../../app.component";
import {Song} from "../../model/Song";
import {SpotifyService} from "../SpotifyService/spotify.service";

@Component({
  selector: 'app-send-song',
  templateUrl: './send-song.component.html',
  styleUrls: ['./send-song.component.css']
})
export class SendSongComponent implements OnInit {
  selectedUser: User | undefined;
  PageNames = PageNames;
  steps: MenuItem[] = [
    {label: 'Who is this for?'},
    {label: 'What song?'}
  ];
  index: number = PageNames.whoTo;
  followedUsers: User[] = [];
  // songs: Song[] = [];
  songs: Song | undefined;

  constructor(private spotifyService: SpotifyService, private userService: UserService, private appCmp: AppComponent) {
  }

  ngOnInit(): void {
    this.refreshUsers();
    this.searchForSongs();
  }

  hideDialog() {
    if (this.index == PageNames.whoTo) {
      this.appCmp.sendSongDialog = false
    } else {
      this.index--;
    }
  }

  refreshUsers() {
    this.userService.getFollowed("si").subscribe(
      data => this.followedUsers = data)
  }
  searchForSongs(){
    this.spotifyService.getSongByTrackId("56iv5TqfvxVa4zLMs6SvmP").subscribe(data=> this.songs = data)
  }
  save() {

  }

  onUserSelect(user: any) {
    this.selectedUser = user;
    this.index++;
  }
}

export enum PageNames {
  whoTo,
  whatSong
}
