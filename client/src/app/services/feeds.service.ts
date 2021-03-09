import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  url: string = environment.base_url
  
  constructor(private _http: HttpClient) { }

  fetchFeeds() {
    return this._http.get(this.url + '/api/feed', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
