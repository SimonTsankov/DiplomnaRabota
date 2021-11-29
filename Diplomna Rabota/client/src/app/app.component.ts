import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {delay} from "rxjs/operators";
import {Router} from "@angular/router";

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
   bMobile = navigator.userAgent.indexOf( "Mobile" ) !== -1 || //checks if the device is mobile
    navigator.userAgent.indexOf( "iPhone" ) !== -1 ||
    navigator.userAgent.indexOf( "Android" ) !== -1 ||
    navigator.userAgent.indexOf( "Windows Phone" ) !== -1 ;

  constructor(private router: Router, private observer: BreakpointObserver) {
    console.log("Yoohoo")

  }


  ngOnInit(): void {

    this.startAnimation()
    let element = document.getElementById("neon-btn")
    if(this.bMobile){
      // @ts-ignore
      element.classList.add("neon-button-small")
    }
    this.changePage("posts");
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

  clickTest() {
    console.log("clicked!")
    this.router.navigate(["/login"]);

  }

  changePage(route: string) {
    this.router.navigate(["/" + route]);
  }

}
