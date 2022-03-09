import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Playlist} from "../../../model/Playlist";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  findAllUrl = environment.apiUrl+"playlist/findAll"
  private addSongToPlaylistURL = environment.apiUrl+"spotify/addSong";
  createPlaylistUrl = environment.apiUrl +"spotify/createPlaylist"

  constructor(private http: HttpClient) {}

  createPlaylist(name: string, isPublic: boolean){
    console.log(isPublic)
    return this.http.post(this.createPlaylistUrl+"?name="+name+"&isPublic="+isPublic,"",{responseType:"text"}).toPromise()
  }

  findAllPlaylists(){
    return this.http.get<Playlist[]>(this.findAllUrl);
  }

}
