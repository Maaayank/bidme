import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _user:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this._user.profile()
    .subscribe(
      data=>{console.log(data);  this.toastr.success("",data.msg)} ,
      error=>{console.error(error.error);this.toastr.error("",error.error.msg)}
    )
  }




}
