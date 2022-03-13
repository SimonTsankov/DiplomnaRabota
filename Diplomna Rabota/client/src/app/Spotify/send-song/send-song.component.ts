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
  songs: Song[] = [];

  searchWord: string="";
  selectedSong: string="-1";

  constructor(private spotifyService: SpotifyService, private userService: UserService, private appCmp: AppComponent) {
  }

  ngOnInit(): void {
    this.refreshUsers();
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
    console.log("searching "+this.searchWord)
    this.spotifyService.getAllSongsLike(this.searchWord).subscribe(data=> this.songs = data)
  }
  save() {

  }

  onUserSelect(user: any) {
    this.selectedUser = user;
    this.index++;
  }

  changeSelected(trackId: string) {
    this.selectedSong= trackId;
  }
}

export enum PageNames {
  whoTo,
  whatSong
}
