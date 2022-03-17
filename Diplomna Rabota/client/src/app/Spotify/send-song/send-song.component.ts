import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {StepsModule} from 'primeng/steps'
import {User} from "../../model/User";
import {UserService} from "../../UserComponents/UserService/user.service";
import {AppComponent} from "../../app.component";
import {Song} from "../../model/Song";
import {SpotifyService} from "../SpotifyService/spotify.service";
import {Router} from "@angular/router";

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

  searchWord: string = "";
  selectedSongTrackId: string = "-1";
  // @ts-ignore
  selectedSongAsObj: Song;

  constructor(private spotifyService: SpotifyService,
              private userService: UserService,
              private appCmp: AppComponent,
              private router: Router) {
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

  searchForSongs() {
    if (this.searchWord.trim() == "")
      return

    this.spotifyService.getAllSongsLike(this.searchWord).subscribe(data => this.songs = data)
  }

  async send() {
    try {
      await this.spotifyService.sendSongRec(this.selectedSongAsObj, this.selectedUser)
      this.appCmp.showToast("Sent!", "Song " + this.selectedSongAsObj.name + "was sent to " + this.selectedUser?.username, false)
    } catch (e) {
      console.log(e)
      this.appCmp.showToast("Could not be sent!", "", true)
    }
  }

  onUserSelect(user: any) {
    this.selectedUser = user;
    this.index++;
  }

  changeSelected(song: Song) {
    this.selectedSongTrackId = song.track_id;
    this.selectedSongAsObj = song;
  }

  gotoUserFollow() {
    this.router.navigate(["/user-search"])
    this.appCmp.sendSongDialog = false
  }
}

export enum PageNames {
  whoTo,
  whatSong
}
