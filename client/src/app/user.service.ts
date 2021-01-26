import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
var url:string='https://01cae9fbb730.ngrok.io';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  //http://127.0.0.1:3000/users/register
  constructor(private _http:HttpClient) { }
  register(body:any){
    return this,this._http.post(url+'/api/auth/signup',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

 // http://127.0.0.1:3000/users/login

  login(body:any){
    return this._http.post(url+'/api/auth/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  // user(){
  //   return this._http.get('http://127.0.0.1:3000/users/user',{
  //     observe:'body',
  //     withCredentials:true,
  //     headers:new HttpHeaders().append('Content-Type','application/json')
  //   })
  // }
 // http://127.0.0.1:3000/users/logout
  logout(){
    return this._http.get('https://3a30a41fe6d2.ngrok.io/api/auth/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  profile(){
    return this._http.get(url+'/api/user/profile',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
}
