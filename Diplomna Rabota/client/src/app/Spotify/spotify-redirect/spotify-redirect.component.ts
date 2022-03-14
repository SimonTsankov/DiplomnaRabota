import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {SpotifyService} from "../SpotifyService/spotify.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-spotify-redirect',
  templateUrl: './spotify-redirect.component.html',
  styleUrls: ['./spotify-redirect.component.css']
})
export class SpotifyRedirectComponent implements OnInit {

  code: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router,
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
      await this.spotifyService.saveRefreshToken(this.code);
      this.router.navigate(["/posts"])
    } catch (e) {
      let text = e.error
      this.appCmp.showToast("Error", text.match("([^:]+$)")[0].substring(0,text.match("([^:]+$)")[0].length-2 ), true)
    }
  }
  ngOnInit(): void {

  }

}
