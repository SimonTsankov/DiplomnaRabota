import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../model/Playlist";
import {PlaylistService} from "./PlaylistService/playlist.service";
import {SpotifyService} from "../SpotifyService/spotify.service";
import {ActivatedRoute} from "@angular/router";
import {Song} from "../../model/Song";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-add-to-playlist',
  templateUrl: './add-to-playlist.component.html',
  styleUrls: ['./add-to-playlist.component.css']
})
export class AddToPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  private songId: string | undefined;
  // @ts-ignore
  songToAdd: Song;
  name: any;
  isPublic: boolean = false;

  constructor(private route: ActivatedRoute,
              private playlistService: PlaylistService,
              private spotifyService: SpotifyService,
              private appCmp: AppComponent) {

  }

  ngOnInit(): void {
    this.refreshData()
    this.route.queryParams
      .subscribe(params => {
          this.songId = params.id;
          this.spotifyService.getSongByTrackId(this.songId + "").subscribe(data => this.songToAdd = data)
        }
      );
  }

  refreshData() {
    this.playlistService.findAllPlaylists().subscribe(data => this.playlists = data)
  }

  async onPlaylistSelected(playlist: Playlist) {
    try {
      await this.spotifyService.addSongToPlaylist(playlist.idSpotify, this.songId + "")
      this.appCmp.showToast("Song added!", "", false)
      // @ts-ignore
      const btn = document.getElementById(playlist.idSpotify).hidden= true
    } catch (e) {
      this.appCmp.logInSpotifyDialog = true;
      this.appCmp.showToast("Song could not be added!", "", true)
    }
  }

  async createPlaylist() {
    try {
      await this.playlistService.createPlaylist(this.name, this.isPublic)
      this.appCmp.showToast("Playlist created!",this.name+" was created!", false)
      this.refreshData()
    } catch (e) {
      this.appCmp.logInSpotifyDialog = true;
      this.appCmp.showToast("Playlist could not be created!","", true)
    }
  }
}
