import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service'

//declare var M: any;
declare var gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//@ViewChild('loginRef', {static: true }) loginElement: ElementRef;
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    pass: new FormControl(null, Validators.required)
  });

  constructor(
    private _router: Router,
    private _user: UserService,
    private _toastr: ToastrService,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.btnRender();
  }

  moveToRegister() {
    this._router.navigate(['/register']);
  }
  login() {
    if (!this.loginForm.valid) {
      console.log("Invalid");
      return
    }

    this._user.login(JSON.stringify(this.loginForm.value))
      .subscribe(

        (data: any) => {
          console.log(data);
          this._router.navigate(['/homepage']);
          this._toastr.success("", data.msg)
        },

        error => {
          console.error(error.error);
          this._toastr.error("", error.error.msg)
        }
      )
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }



  public btnRender(): void {
    const options = {
      scope: 'profile email',
      width: 250,
      height: 50,
      longtitle: true,
      theme: 'dark',


      onsuccess: ((googleUser: any) => {
        let profile = googleUser.getBasicProfile();
        const token = googleUser.getAuthResponse().id_token
        const username = profile.getName()
        const email = profile.getEmail()

        this.signOut()

        this._user.gsignin(JSON.stringify({
          token: token,
          username: username,
          email: email
        })).subscribe(
          (data: any) => {
            console.log(data);
            this._toastr.success("", data.msg)
            this._router.navigate(['/homepage']);
          },
          error => {
            console.error(error.error);
            this._toastr.error("", error.error.msg)
          }
        )
      }),

      onfailure: ((error: any) => {
        console.log('failure', error);
      })
    };

    gapi.signin2.render('googleBtn', options);
  }
}
