import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) { }

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
        data => { console.log(data); this._router.navigate(['/homepage']); this.toastr.success("", data.msg) },
        error => { console.error(error.error); this.toastr.error("", error.error.msg) }
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


      onsuccess: (googleUser => {
        let profile = googleUser.getBasicProfile();
        const token = googleUser.getAuthResponse().id_token
        const username = profile.getName()
        const email = profile.getEmail()

        this.signOut()

        // your-code-goes-here
        this._user.gsignin(JSON.stringify({
          token: token,
          username: username,
          email: email
        })).subscribe(
          data => { console.log(data); this._router.navigate(['/homepage']); this.toastr.success("", data.msg) },
          error => { console.error(error.error); this.toastr.error("", error.error.msg) }
        )

      }),

      onfailure: ((error: any) => {
        console.log('failure', error);
      })
    };

    gapi.signin2.render('googleBtn', options);
  }
}
