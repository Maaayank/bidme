import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://127.0.0.1:3000';

  constructor(private _http: HttpClient, private _dataService: DataService) { }

  register(body: any) {
    return this, this._http.post(this.url + '/api/auth/signup', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    return this._http.post(this.url + '/api/auth/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  gsignin(body: any) {
    return this._http.post(this.url + '/api/auth/gsignin', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Access-Control-Allow-Origin', '/')
    });
  }

  logout() {
    return this._http.get(this.url + '/api/auth/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  profile() {
    return this._http.get(this.url + '/api/user/profile', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  apiData() {
    return this._dataService.getData();
  }

  productsList() {
    return this._dataService.getProducts();
  }

}
