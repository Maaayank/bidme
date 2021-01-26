import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
declare var gapi: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)
    //phone:new FormControl(null,Validators.required)

  });
  constructor(private _router: Router, private _userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.btnRender();
  }
  moveToLogin() {
    this._router.navigate(['/login']);
  }
  register() {
    if (!this.registerForm.valid || (this.registerForm.controls.pass.value != this.registerForm.controls.cpass.value)) {
      console.log("invalid");
      return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(data => { console.log(data); this._router.navigate(['/login']); this.toastr.success("", data.msg) },
      error => { console.error(error.error); this.toastr.error("", error.error.msg) }
    );
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
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // your-code-goes-here

      }),
      onfailure: ((error) => {
        console.log('failure', error);
      })
    };
    gapi.signin2.render('googleBtn', options);
  }

}
