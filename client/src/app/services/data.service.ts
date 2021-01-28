import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _username = new BehaviorSubject<String>("");
    username = this._username.asObservable();

    private _wallet = new BehaviorSubject<String>("0")
    wallet = this._wallet.asObservable();

    private _isLoggedIn = new BehaviorSubject<Boolean>(false)
    isLoggedIn = this._isLoggedIn.asObservable();


    constructor() {

    }

    changeUsername(username: String) {
        this._username.next(username)
    }

    changeWallet(wallet: String) {
        this._wallet.next(wallet)
    }

    toggleIsLoggedIn(isLoggedIn: Boolean) {
        this._isLoggedIn.next(isLoggedIn)
    }
}