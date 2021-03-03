import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = "https://540a5a2d797e.ngrok.io"
  constructor(private _http: HttpClient) { }
  fetchProduct(){
    return this._http.get(this.url + '/api/product/0/all', {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
