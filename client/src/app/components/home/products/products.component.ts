import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../services/data.service'

@Component({
  selector: 'homepage-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private _user: UserService,
    private _toastr: ToastrService,
    private _dataService: DataService,
  ) { }

  ngOnInit(): void {
  }

}