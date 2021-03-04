import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // url: string = "https://4ac680e1d5a7.ngrok.io"
  url: string = "http://localhost:3000"

  constructor(private _http: HttpClient) { }
  fetchProduct(){
    return this._http.get(this.url + '/api/product/0/all', {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  fetchProductDetail(id){
    return this._http.get(this.url + `/api/product/${id}/info`, {
        observe: 'body',
        withCredentials: false,
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      })
  }
}
