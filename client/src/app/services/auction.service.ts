import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  socket: SocketIOClient.Socket;

  constructor() { }

  connectToAuction(){ 
    console.log(`connecting to auction`)
    this.socket = io(environment.base_url);  
  }

  onBidUpdates(pid){
    return new Observable( observer => {
      this.socket.on(String(pid), res => {
        observer.next(res)
      })
    })
  }

  disconnectSocket(){
    if(this.socket)
      this.socket.disconnect()
  }

}
