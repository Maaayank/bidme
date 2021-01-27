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
  isLoggedIn: Boolean = false

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this._dataService.username.subscribe(username => this.username = username)
    this._dataService.wallet.subscribe(wallet => this.wallet = wallet)
    this._dataService.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn)
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
        },

        error => {
          console.error(error.error);
          this._toastr.error("", error.error.msg)
        }
      )
  }
}
