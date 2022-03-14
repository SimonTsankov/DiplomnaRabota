import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../../app.component";
import {UserService} from "../UserService/user.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password = new FormControl('', [Validators.required, Validators.minLength(3)])
  passwordconfirm = new FormControl('', [Validators.required, Validators.minLength(3)])

  hide = true;

  passwords: FormGroup = new FormGroup({
    passwordconfirm: this.passwordconfirm,
    password: this.password
  });
  private hash: any;

  constructor(private router: Router, private route: ActivatedRoute, private appcmp: AppComponent, private userService: UserService) {
    this.route.queryParams
      .subscribe(params => {
          this.hash = params.hash;
          console.log(this.hash)
        }
      );
  }

  ngOnInit(): void {
  }

  async saveNewPassword() {
    if (this.passwordconfirm.value == this.password.value) {
      try {

        await this.userService.doSendPasswordReset(this.hash, this.password.value + "")
        this.appcmp.showToast("Password changed successfully", "Please login", false)
        this.router.navigate(["login"])
      } catch (e) {
        this.appcmp.showToast("Error", e.error, true)
      }

      return
    }
    this.appcmp.showToast("Passwords don't match!", "", true)
    return;
  }
}
