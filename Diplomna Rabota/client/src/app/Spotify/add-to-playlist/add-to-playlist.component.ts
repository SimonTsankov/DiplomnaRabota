import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../model/Playlist";
import {PlaylistService} from "./PlaylistService/playlist.service";
import {SpotifyService} from "../SpotifyService/spotify.service";
import {ActivatedRoute} from "@angular/router";
import {Song} from "../../model/Song";

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

  constructor(private route: ActivatedRoute, private playlistService: PlaylistService, private spotifyService: SpotifyService) {
    this.refreshData()
    this.route.queryParams
      .subscribe(params => {
          this.songId = params.id;
          this.spotifyService.getSongByTrackId(this.songId + "").subscribe(data => this.songToAdd = data )
        }
      );
  }

  ngOnInit(): void {
    this.refreshData()
    this.route.queryParams
      .subscribe(params => {
          this.songId = params.id;
          this.spotifyService.getSongByTrackId(this.songId + "").subscribe(data => this.songToAdd = data )
      }
      );
  }

  refreshData() {
    this.playlistService.findAllPlaylists().subscribe(data => this.playlists = data)
  }

  onPlaylistSelected(playlist: Playlist) {
    this.spotifyService.addSongToPlaylist(playlist.idSpotify, this.songId + "")
  }

  createPlaylist() {

  }
}
