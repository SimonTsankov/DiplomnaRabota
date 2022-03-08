import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../model/Playlist";
import {PlaylistService} from "./PlaylistService/playlist.service";
import {SpotifyService} from "../SpotifyService/spotify.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-to-playlist',
  templateUrl: './add-to-playlist.component.html',
  styleUrls: ['./add-to-playlist.component.css']
})
export class AddToPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  private songId: string | undefined;

  constructor(private route: ActivatedRoute, private playlistService: PlaylistService, private spotifyService:  SpotifyService) {
  }

  ngOnInit(): void {
    this.refreshData()
    this.route.queryParams
      .subscribe(params => {
          this.songId = params.id;
        }
      );
  }

  refreshData() {
    this.playlistService.findAllPlaylists().subscribe(data => this.playlists = data)
  }

  onPlaylistSelected(playlist: Playlist) {
      this.spotifyService.addSongToPlaylist(playlist.idSpotify, this.songId+"")
  }
}
