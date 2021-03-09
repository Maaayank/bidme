import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.base_url;
  product_api: string = environment.products_api

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

  productTitles() {
    return this._http.get(this.product_api + '/titles', {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  productSearchByKeywords(keyword) {
    let params = new HttpParams().set('keyword', keyword);
    return this._http.get(this.product_api + '/search', {
      params: params,
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  productDetails(pid) {
    return this._http.get(this.product_api + '/search/' + pid, {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  submitProduct(details) {
    return this._http.post(this.url + '/api/product/new', details, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // mapcall(lat,long){
  //   return this._http.get('https://www.mapquestapi.com/geocoding/v1/reverse?key=mPozin83OcZiK7houmEyIzfqOIivsCr5&location='+lat+'%2C'+long+'&outFormat=json&thumbMaps=false')
  // }

}
