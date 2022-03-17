import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {MenuItem, MessageService} from "primeng/api";
import {AuthenticationService} from "./authentication/AuthServices/authService/authentication.service";
import {TokensService} from "./authentication/AuthServices/TokenService/tokens.service";
import {SpotifyService} from "./Spotify/SpotifyService/spotify.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Reccomend me a song!';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  component: string = "";
  // @ts-ignore
  bMobile = navigator.userAgent.indexOf("Mobile") !== -1 || //checks if the device is mobile
    navigator.userAgent.indexOf("iPhone") !== -1 ||
    navigator.userAgent.indexOf("Android") !== -1 ||
    navigator.userAgent.indexOf("Windows Phone") !== -1;


  //theme picker variables
  themes: any;
  valueThemePicker: any;
  themeButtons = ['red', 'green', 'purple']
  originalButton = document.getElementById("themePicker");
  hideThemePicker = false;
  savedTheme = window.localStorage.getItem("theme");
  host = document.querySelector(':host');
  // @ts-ignore
  logged: boolean = this.checkLogin()
  sendSongDialog: boolean = false;
  logInSpotifyDialog: boolean = false;


  constructor(private authenticationService: AuthenticationService
    , private tokenService: TokensService
    , private messageService: MessageService
    , private elementRef: ElementRef
    , private router: Router
    , private spotifyService: SpotifyService) {

    if (this.savedTheme) {
      this.clickTest(this.savedTheme)
    }
  }


  ngOnInit(): void {

    this.logged = this.authenticationService.checkLogin();
    this.clickTest('red')
    let themePicker = document.getElementById("red");
    if (themePicker != null) {
      themePicker.style.setProperty("background-color", "#8dbcee")
      themePicker.style.setProperty("color", "black")
      themePicker.style.setProperty("font-size", "medium")
    }


    this.startAnimation()
    let element = document.getElementById("neon-btn")
    if (this.bMobile) {
      // @ts-ignore
      element.classList.add("neon-button-small")
    }

  }

  checkLogin() {
    this.logged = this.authenticationService.checkLogin();
    // console.log(this.logged)
    return this.logged;
  }

  async startAnimation() {
    let element = document.getElementById("neon-btn");

    const mouseoverEvent = new Event('mouseover');
    // @ts-ignore
    element.dispatchEvent(mouseoverEvent);
    // @ts-ignore
    setTimeout(() => element.animate(
        [
          {
            color: 'var(--neon-clr2)',
            boxShadow: '0 0 1em 0.5em var(--neon-clr)',
            textShadow: 'none',
            "background": "var(--neon-clr)"//hsl(31, 100%, 50%) orange
          }

        ],
        {duration: 1000, iterations: Math.random() * 2}
      )
      , 1000)

    setTimeout(() => {
      this.startAnimation()
    }, Math.random() * 10000)

  }

  clickTest(item: any) {
    this.themeButtons.forEach(element => this.resetButton(element));
    window.localStorage.setItem("theme", item);
    this.savedTheme = item
    switch (item) {
      case 'red':
        environment.redTheme.forEach(element => this.elementRef.nativeElement.style.setProperty(element.attribute, element.value))
        break;
      case'purple':
        environment.purpleTheme.forEach(element => this.elementRef.nativeElement.style.setProperty(element.attribute, element.value))
        break;
      case 'green':
        environment.greenTheme.forEach(element => this.elementRef.nativeElement.style.setProperty(element.attribute, element.value))
        break;
    }
  }

  resetButton(btnName: any) {
    let themePicker = document.getElementById(btnName);
    if (themePicker != null) {
      themePicker.style.setProperty("background-color", "white")
      themePicker.style.setProperty("color", btnName)
      themePicker.style.setProperty("font-size", "small")
    }
  }

  changePage(route: string) {
    this.router.navigate(["/" + route]);
  }

  toggleThemesPicker() {
    this.hideThemePicker = !this.hideThemePicker
  }

  public showToast(title: string, message: string, isError: boolean) {
    this.messageService.add({
      severity: isError ? 'error' : 'success',
      summary: title,
      detail: message
    })
  }

  logOut() {
    this.tokenService.removeTokens();
    this.logged = false;
    window.location.reload();
    window.location.replace('/login')

  }

  goToMyProfile() {
    const elementContent = document.getElementById("content");
    // @ts-ignore
    elementContent.scroll(0, 0)
    console.log("Scrolled")
    this.router.navigate(['myprofile'])
  }


  goToUserSearch() {
    const elementContent = document.getElementById("content")
    // @ts-ignore
    elementContent.scroll(0, 0)
    this.router.navigate(['user-search'])
  }

  async logInSpotifyRedirect() {
    window.open(await this.spotifyService.getReddirectUrl(), "_blank")
  }
}
