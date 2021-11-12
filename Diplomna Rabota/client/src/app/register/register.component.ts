import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router, RouterModule} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

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

  constructor(private router: Router) {

    // @ts-ignore
    this.email.setValue("");
    // @ts-ignore
    this.password.setValue("");
  }

  ngOnInit(): void {
  }

  register() {

    //TODO: this.registerService.doRegister(email.value, password.value, username)
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
