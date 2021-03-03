import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  url: string = "http://127.0.0.1:3000"
  // url:string="https://540a5a2d797e.ngrok.io"
  constructor(private _http: HttpClient) { }

  fetchFeeds() {
    return this._http.get(this.url + '/api/feed', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
