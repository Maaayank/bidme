import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _user: UserService, private _toastr: ToastrService, private _dataService: DataService) { }
  ngOnInit(): void {

    this._user.profile()
      .subscribe(
        (data: any) => {
          console.log(data);
          this._dataService.changeUsername(data.username || "")
          this._dataService.changeWallet(data.wallet || "0")
          this._dataService.toggleIsLoggedIn(true)

          if (data != null && data.msg) {
            this._toastr.success("", data.msg)
          }
        },
        
        error => {
          this._dataService.toggleIsLoggedIn(false)
        }
      )
  }




}
