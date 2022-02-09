import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Playlist} from "../../../model/Playlist";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  findAllUrl = environment.apiUrl+"playlist/findAll"
  constructor(private http: HttpClient) {}

  findAllPlaylists(){
    return this.http.get<Playlist[]>(this.findAllUrl);
  }
}
