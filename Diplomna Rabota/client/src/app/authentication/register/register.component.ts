import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";
import {User} from "../../model/User";
import {AppComponent} from "../../app.component";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {SpotifyService} from "../../Spotify/SpotifyService/spotify.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  user: User = {} as User;
  email = new FormControl('', [Validators.email, Validators.required])
  password = new FormControl('', [Validators.required, Validators.minLength(3)])
  passwordConfirm = new FormControl('', [Validators.required, Validators.minLength(3)])
  username = new FormControl('', [Validators.minLength(4), Validators.required]);

  hideRegFields = false;
  counter = 8;

  signin: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
    username: this.username,
    passwordConfirm: this.passwordConfirm
  });
  hide = true;

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private registerService: RegisterService,
              private router: Router,
              private appCmp: AppComponent,
              private spotifyService: SpotifyService) {

    // @ts-ignore
    this.email.setValue("");
    // @ts-ignore
    this.password.setValue("");
  }

  ngOnInit(): void {
  }

  async register() {
    try {
      this.user.password = this.password.value.trim();
      this.user.email = this.email.value.trim();
      this.user.username = this.username.value.trim();
      if(this.username.value.trim()==""|| this.username.value==null){
        this.appCmp.showToast("Username cant be empty", "", true);
        return
      }
      if (this.password.value == this.passwordConfirm.value) {
        await this.registerService.register(this.user)
        this.hideRegFields = true;
        this.startCounter()
      }else {
        this.appCmp.showToast("Passwords don't match", "", true);
        return
      }
    } catch (e) {
      this.appCmp.showToast("Error", e.error, true)
    }
  }

  startCounter() {
    setInterval(() => {
      this.counter -= 1
      if (this.counter == 0) {
        this.changePath('login');
      }
    }, 1000);
  }

  changePath(path: string) {
    this.router.navigate([path])
  }

  // confirm1() {
  //   console.log("CONFIRM");
  //   this.confirmationService.confirm({
  //     message: 'Do you want to login to your Spotify account?' +
  //       ' \n This will be used to create and update your playlists!' +
  //       '\n You can always go into my profile and Sign in from there!',
  //     header: 'Account succesfully created',
  //     icon: 'pi pi-sign-in',
  //     accept: async () => {
  //       let url = await this.spotifyService.getReddirectUrl();
  //       console.log(url)
  //       window.open(url, "_blank")
  //     },
  //     // @ts-ignore
  //     reject: (type) => {
  //       switch (type) {
  //         case ConfirmEventType.REJECT:
  //           this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
  //           break;
  //         case ConfirmEventType.CANCEL:
  //           this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
  //           break;
  //       }
  //     }
  //   });
  // }


}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

