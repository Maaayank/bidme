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

loginForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.email,Validators.required]),
    pass:new FormControl(null,Validators.required)
});
  constructor(private _router:Router,private _user:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.btnRender();
  }
  moveToRegister(){
    this._router.navigate(['/register']);
  }
login(){
  if(!this.loginForm.valid){
    console.log("Invalid");
    return
  }

  this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{console.log(data);  this._router.navigate(['/homepage']); this.toastr.success("",data.msg)} ,
      error=>{console.error(error.error);this.toastr.error("",error.error.msg)}
    )
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
