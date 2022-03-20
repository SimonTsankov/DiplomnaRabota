import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../authentication/login/login.component";
import {UserService} from "../UserService/user.service";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-newpassword',
  templateUrl: './request-newpassword.component.html',
  styleUrls: ['./request-newpassword.component.css']
})
export class RequestNewpasswordComponent implements OnInit {
  email = new FormControl('', [Validators.email, Validators.required])
  matcher = new MyErrorStateMatcher();
  hidden = false;
  signIn: FormGroup = new FormGroup({
    email: this.email
  });

  constructor(private router: Router, private userService: UserService, private appCmp: AppComponent) { }

  ngOnInit(): void {
  }

  async sendPasswordResetRequest() {
    try {
      await this.userService.doRequestPasswordReset(this.email.value);
      this.hidden = true
      this.appCmp.showToast("Email Sent!","",false)

      this.redirectLogin();
    } catch (e) {
      let msg = e.error;
      if (e.error.toString() == "[object ProgressEvent]") msg = "Server timed out";
      this.appCmp.showToast( "Email couldn't be sent!",msg,true)
    }
  }
  redirectLogin() {
      this.router.navigate(["/login"])
  }
}
