import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.email, Validators.required])
  password = new FormControl('', [Validators.required, Validators.minLength(3)])
  matcher = new MyErrorStateMatcher();


  signin: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  hide = true;

  constructor(private appComponent:AppComponent, private router: Router, private loginService: LoginService) {

    // @ts-ignore
    this.email.setValue("");
    // @ts-ignore
    this.password.setValue("");
  }

  ngOnInit(): void {
  }

  get emailInput() {
    return this.signin.get('email');
  }

  get passwordInput() {
    return this.signin.get('password');
  }

  async login() {
    try {
      await this.loginService.login(this.email.value, this.password.value)
      this.router.navigate(['posts'])
      this.appComponent.logged=true
    } catch (Exception) {
      console.log(Exception)
      this.appComponent.showToast("Could not log in","Wrong credentials or unconfirmed email", true)
    }
  }

  gotoRequestPassword() {
    this.router.navigate(["request-new-password"]);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
