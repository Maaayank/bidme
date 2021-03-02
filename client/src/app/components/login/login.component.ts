import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    // email: new FormControl('', [Validators.email, Validators.required]),
    // pass: new FormControl('',[Validators.required,  Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)])
    email: new FormControl('', []),
    pass: new FormControl('', [])
  });

  get email() { return this.loginForm.get('email') }
  
  constructor(
    private _router: Router,
    private _user: UserService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.btnRender();
  }


  moveToRegister() {
    window.open("/register","_self")
  }

  login() {
    
    this._user.login(JSON.stringify(this.loginForm.value))
      .subscribe(

        (data: any) => {
          console.log(data);
          this._router.navigate(['/homepage']);
          this._toastr.success("", data.msg)
        },

        error => {
          console.error(error.error.msg);
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
      width: 'auto',
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

  onSignedIn(googleUser: any) {
    let profile = googleUser.getBasicProfile();
    const token = googleUser.getAuthResponse().id_token
    const username = profile.getName()
    const email = profile.getEmail()
    console.log(token + " " + username + " " + email )
  }
}
