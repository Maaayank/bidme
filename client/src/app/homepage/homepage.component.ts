import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private _user: UserService, private toastr: ToastrService, private val: AppComponent) { }

  ngOnInit(): void {

    this._user.profile()
      .subscribe(
        data => {
          console.log(data);
          console.log(this.val.title);
          this.val.username = data.username;
          this.val.wallet = data.wallet;
          this.val.isLoggedin = true;
          if (data != null && data.msg) {
            this.toastr.success("", data.msg)
          }
        },
        error => {
          console.error(error.error);
          this.toastr.error("", error.error.msg)
          this.val.isLoggedin = false;
        }
      )
  }




}
