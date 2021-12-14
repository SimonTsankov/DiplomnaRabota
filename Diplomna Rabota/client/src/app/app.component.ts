import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {delay} from "rxjs/operators";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {MessageService} from "primeng/api";
declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Rockmend me';
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
  logged =  true;

  constructor( private messageService: MessageService, private elementRef: ElementRef, private router: Router, private observer: BreakpointObserver) {
    if(this.savedTheme){
        this.clickTest(this.savedTheme)
    }
  }


  ngOnInit(): void {
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
    this.savedTheme= item
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
    environment.redTheme.forEach(element => console.log(element.attribute + "  " + element.value))
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

}
