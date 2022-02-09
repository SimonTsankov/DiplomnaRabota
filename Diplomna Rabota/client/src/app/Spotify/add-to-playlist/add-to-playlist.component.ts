import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../model/Playlist";
import {PlaylistService} from "./PlaylistService/playlist.service";

@Component({
  selector: 'app-add-to-playlist',
  templateUrl: './add-to-playlist.component.html',
  styleUrls: ['./add-to-playlist.component.css']
})
export class AddToPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.refreshData()
  }

  refreshData() {
    this.playlistService.findAllPlaylists().subscribe(data => this.playlists = data)
  }
}
