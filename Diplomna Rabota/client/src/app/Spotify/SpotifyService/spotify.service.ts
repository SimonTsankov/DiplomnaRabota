import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  getReddirectUrlEndpint = environment.apiUrl + "spotify/getReddirectUrl"
  saveRefreshTokenUrl = environment.apiUrl + "spotify/saveRefreshToken"

  constructor(private http: HttpClient) {
  }

  async getReddirectUrl() {
    return await this.http.get(this.getReddirectUrlEndpint, {responseType: "text"}).toPromise()
  }

   saveRefreshToken(code: string | undefined) {

      return this.http.post(this.saveRefreshTokenUrl + "?code=" + code, "", {responseType: "text"}).toPromise()

  }

}
