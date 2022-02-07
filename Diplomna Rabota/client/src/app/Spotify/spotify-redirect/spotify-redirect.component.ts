import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../SpotifyService/spotify.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-spotify-redirect',
  templateUrl: './spotify-redirect.component.html',
  styleUrls: ['./spotify-redirect.component.css']
})
export class SpotifyRedirectComponent implements OnInit {

  code: string | undefined;

  constructor(private route: ActivatedRoute,
              private spotifyService: SpotifyService,
              private appCmp: AppComponent) {
    this.route.queryParams.subscribe(
    params =>{
      this.code = params["code"];
      this.sendRequest();
      }
  )

  }
  async sendRequest() {
    try {
      console.log("SENT")
      await this.spotifyService.saveRefreshToken(this.code);
    } catch (e) {
      let text = e.error
      console.log(text.match("([^:]+$)"))
      this.appCmp.showToast("Error", text.match("([^:]+$)")[0].substring(0,text.match("([^:]+$)")[0].length-2 ), true)
    }
  }
  ngOnInit(): void {

  }

}
