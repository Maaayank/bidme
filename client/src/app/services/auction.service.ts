import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  socket: SocketIOClient.Socket;

  constructor() { }

  connectToAuction(){ 
    this.socket = io('http://localhost:3000');  
  }

  onBidUpdates(pid){
    return new Observable( observer => {
      this.socket.on(String(pid), res => {
        observer.next(res)
      })
    })
  }

  disconnectSocket(){
    this.socket.disconnect()
  }

}
