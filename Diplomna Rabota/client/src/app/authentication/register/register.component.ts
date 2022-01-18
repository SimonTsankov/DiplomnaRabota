import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";
import {User} from "../../model/User";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  user: User = {} as User;
  email = new FormControl('', [Validators.email, Validators.required])
  password = new FormControl('', [Validators.required, Validators.minLength(3)])
  passwordConfirm = new FormControl('', [Validators.required, Validators.minLength(3)])
  username = new FormControl('', [Validators.minLength(4), Validators.required]);

  signin: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
    username: this.username,
    passwordConfirm: this.passwordConfirm
  });
  hide = true;

  constructor(private registerService: RegisterService,private router: Router) {

    // @ts-ignore
    this.email.setValue("");
    // @ts-ignore
    this.password.setValue("");
  }

  ngOnInit(): void {
  }

  register() {
    this.user.password=this.password.value;
    this.user.email=this.email.value;
    this.registerService.register(this.user)
  }

  changePath(path: string) {
    this.router.navigate([path])
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
