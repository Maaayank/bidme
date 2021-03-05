import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: String = ''
  wallet: String = ''
  username: String = ''
  feedVisible: Boolean = false
  isLoggedIn: Boolean = false

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _toastr: ToastrService
  ) { }
  ngOnInit() {
    this._dataService.username.subscribe(username => this.username = username)
    this._dataService.wallet.subscribe(wallet => this.wallet = wallet)
    this._dataService.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn)
    this._dataService.feed.subscribe(feed => this.feedVisible = feed)
  }
  toggleFeed() {
    console.log(this.feedVisible)
    if (this.feedVisible) {
      this._dataService.toggleFeed(false)
    }
    else {
      this._dataService.toggleFeed(true)
    }
  }

  logout() {
    this._userService.logout()
      .subscribe(

        (data: any) => {
          console.log(data);
          this._dataService.toggleIsLoggedIn(false)
          this._dataService.changeUsername('')
          this._dataService.changeWallet('')
          this._toastr.success("", data.msg)
          this._userService.checkL=false;
        },

        error => {
          console.error(error.error);
          this._toastr.error("", error.error.msg)
        }
      )
  }
}
