import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from "../model/User";
import {LoginService} from "./login.service";



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
    email:this.email,
    password: this.password
  });

  hide = true;
  constructor(private loginService: LoginService) {

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

  login() {
    console.log("dwdw")
    this.loginService.login(this.email.value, this.password.value)
    console.log("dwdw")
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
