import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  out: Boolean = true;
  feature_form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  })

  highlights_form: FormGroup = new FormGroup({
    highlight: new FormControl('', [Validators.required])
  })


  data = {}
  products = []

  constructor(
    private _user: UserService,
    private _toastr: ToastrService,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    console.log(this.products)

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

  addFeature() {

    !('productDetails' in this.data) && (this.data.productDetails = [])

    this.data.productDetails.push(this.feature_form.value)
    this.feature_form.setValue({
      name: "",
      value: ""
    })
  }

  addHighlight() {

    !('productHiglight' in this.data) && (this.data.productHiglight = [])

    this.data.productHiglight.push(this.highlights_form.value.highlight)

    this.highlights_form.setValue({
      highlight: ""
    })
  }

  removeFeature(i) {
    this.data.productDetails.splice(i, 1);
  }

  removeField(key: string) {
    delete this.data[key];
  }

  removeHighLight(i) {
    this.data.productHiglight.splice(i, 1)
  }

  onNext() {

    this._user.productSearchByKeywords("HP envy").subscribe(

      (data: any) => {
        this._user.productDetails(data.productsTitles[0].pid).subscribe(
          (data: any) => {
            console.log(data.product);
            this.data = data.product
            this._toastr.success("success product")
          },

          error => {
            console.error(error.error);
            this._toastr.error("", error.error.msg)
          }
        )
        console.log(data.productsTitles[0]);
        this._toastr.success("success")
      },

      error => {
        console.error(error.error);
        this._toastr.error("", error.error.msg)
      }
    )
  }

}

class Feature {
  name: string;
  value: string
}
