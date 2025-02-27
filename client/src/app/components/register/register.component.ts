import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';

declare var gapi: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  info:any;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', [Validators.required,Validators.minLength(3)]),
    pass: new FormControl('', [Validators.required,Validators.minLength(6)]),
    cpass: new FormControl('', [Validators.required,Validators.minLength(6)])

  });
  get email() { return this.registerForm.get('email') }
  get pass() { return this.registerForm.get('pass') }
  get username() { return this.registerForm.get('username') }
  get cpass() { return this.registerForm.get('cpass') }
  constructor(private _router: Router, private _userService: UserService, private _toastr: ToastrService, private _dataService: DataService) {
    this.info={
      uName:'Username is Invalid',
      email:'Email is Invalid',
      pass:'Password should contain First capital letter Password should be of min 8 length Password should contain at least special character and digit'
    }
  }

  ngOnInit(): void {
    this.pass==this.cpass;
    this.btnRender();
  }


  moveToLogin() {
    window.open("/login", "_self")
  }

  register() {

    if (!this.registerForm.valid || this.registerForm.controls.pass.value != this.registerForm.controls.cpass.value) {
      //todo show propoer valid messeges .
      console.log("invalid");
      return;
    }

    this._userService
      .register(JSON.stringify(this.registerForm.value))
      .subscribe(
        (data: any) => {
          this.moveToLogin();
          this._toastr.success(data.msg, null)
        },

        error => {
          console.error(error.error);
          this._toastr.error("", error.error.msg)
        }
      );
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

        this._userService.gsignin(JSON.stringify({
          token: token,
          username: username,
          email: email
        })).subscribe(
          (data: any) => {
            console.log(data);
            this._router.navigate(['/home']);
            this._toastr.success("", data.msg)
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

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

}
