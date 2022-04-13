import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../UserService/user.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  private hash: string="";
  counter = 8;

  constructor(private route: ActivatedRoute, private userService: UserService, private appCmp: AppComponent, private router: Router) {
    this.route.queryParams
    .subscribe(params => {
        this.hash = params.hash;
      }
    );
    this.confirmEmail()
  }
  async confirmEmail(){
    try {
    await this.userService.confirmEmail(this.hash);
    this.startCounter();
    }catch (e){
      this.appCmp.showToast("Invalid email confirmation",e.error,true);
      this.router.navigate(["login"])
    }
  }
  startCounter() {
    setInterval(() => {
      this.counter -= 1
      if (this.counter == 0) {
        this.router.navigate(["/login"])
      }
    }, 1000);
  }
  ngOnInit(): void {

  }

}
