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
  component: string="";

  constructor(private router: Router,private observer: BreakpointObserver) {
    console.log("Yoohoo")
  }


  ngOnInit(): void {

    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
          this.sidenav.open();
      });
  }

  clickTest() {
    console.log("clicked!")
    this.router.navigate(["/login"]);
  }

  changePage(route: string) {
    this.router.navigate(["/"+route]);
  }

}
