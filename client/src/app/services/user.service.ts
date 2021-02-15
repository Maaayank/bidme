import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://127.0.0.1:3000';
  product_api: string = "https://product-info-api.herokuapp.com/api"

  constructor(private _http: HttpClient) { }

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

  productTitles(){
    return this._http.get(this.product_api + '/titles', {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  productSearchByKeywords(keyword){
    let params = new HttpParams().set('keyword', keyword);
    return this._http.get(this.product_api + '/search', {
      params: params,
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  productDetails(pid){
    return this._http.get(this.product_api + '/search/' + pid, {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

}
