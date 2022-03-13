import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Playlist} from "../../model/Playlist";
import {Song} from "../../model/Song";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  addSongToPlaylistURL = environment.apiUrl+"spotify/addSong";
  getReddirectUrlEndpint = environment.apiUrl + "spotify/getReddirectUrl"
  saveRefreshTokenUrl = environment.apiUrl + "spotify/saveRefreshToken"
  getSongByTrackIdUrl = environment.apiUrl +"spotify/findSongByTrackId"
  getAllSongsLikeUrl = environment.apiUrl +"spotify/searchTracks?searchWord="
  constructor(private http: HttpClient) {
  }


  async getReddirectUrl() {
    return await this.http.get(this.getReddirectUrlEndpint, {responseType: "text"}).toPromise()
  }
   getSongByTrackId(trackId: string){
    return this.http.get<Song>(this.getSongByTrackIdUrl+"?trackId="+trackId)
  }
   saveRefreshToken(code: string | undefined) {
      return this.http.post(this.saveRefreshTokenUrl + "?code=" + code, "", {responseType: "text"}).toPromise()
  }
   addSongToPlaylist(playlistId: string, songId: string){
    return this.http.post(this.addSongToPlaylistURL + "?playlistId=" + playlistId+"&songId="+ songId, "", {responseType: "text"}).toPromise()
  }

  getAllSongsLike(searchWord: string) {
    return this.http.get<Song[]>(this.getAllSongsLikeUrl+searchWord)
  }
}
