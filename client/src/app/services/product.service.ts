import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string= environment.base_url;

  constructor(private _http: HttpClient) { }
  fetchProduct(){
    return this._http.get(this.url + '/api/product/0/all', {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  fetchProductDetail(id: any){
    console.log(id)
    return this._http.get(this.url + `/api/product/${id}/info`, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      })
  }

  bidOnProduct(data){
    return this._http.post(this.url + `/api/product/bid`, data, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
}
