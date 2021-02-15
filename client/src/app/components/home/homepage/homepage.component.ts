import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../services/data.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  out: Boolean = true;

  product: Product = {
    productDetails: [],
    productTitle: null,
    productHiglight: [],
    manufacturer: null,
    price: null
  }

  details = {}


  constructor(
    private _user: UserService,
    private _toastr: ToastrService,
    private _dataService: DataService,
  ) { }

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



  onClear() {
    //todo : nothing for now
  }

  onNext(details: any) {
    this.details = details
    this.out = false;
    this._user.productSearchByKeywords(details.title).subscribe(
      (data: any) => {
        if (data.productsTitles.length == 0) {
          this._toastr.error("", "no matching product found")
        } else {
          this._user.productDetails(data.productsTitles[0].pid).subscribe(
            (data: any) => {
              this.product = data.product
              this._toastr.success("", "Details Fetched")
            },

            error => {
              this._toastr.error("", error.error.msg)
            }
          )
        }
      },

      error => {
        this._toastr.error("", error.error.msg)
      }
    )
  }

  submit(productDetails){
    console.log(productDetails,this.details)
  }
}

class Product {
  productTitle: String;
  productHiglight: String[];
  productDetails: String[];
  price: String;
  manufacturer: String
}
