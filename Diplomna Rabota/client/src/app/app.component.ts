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
   bMobile = navigator.userAgent.indexOf( "Mobile" ) !== -1 ||
    navigator.userAgent.indexOf( "iPhone" ) !== -1 ||
    navigator.userAgent.indexOf( "Android" ) !== -1 ||
    navigator.userAgent.indexOf( "Windows Phone" ) !== -1 ;
  constructor(private router: Router, private observer: BreakpointObserver) {
    console.log("Yoohoo")
  }


  ngOnInit(): void {
    this.randomNum()
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        this.sidenav.open();
      });
    let element = document.getElementById("neon-btn")
    if(this.bMobile){
      // @ts-ignore
      element.classList.add("neon-button-small")
    }
  }

  async randomNum() {

    let element = document.getElementById("neon-btn");


    const mouseoverEvent = new Event('mouseover');
    // @ts-ignore
    element.dispatchEvent(mouseoverEvent);
    // @ts-ignore
    setTimeout(() => element.animate(
      [
        {

          color: '#2b0229',
          boxShadow: '0 0 1em 0.5em var(--neon-clr',
          textShadow: 'none',
          "background": "hsl(317, 100%, 54%)"//hsl(31, 100%, 50%) orange
        }

      ],
      {duration: 1000, iterations: Math.random() * 2, easing: "ease-out"}
      )
      , 1000)

    console.log(element)

    setTimeout(() => {
      this.randomNum()
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
