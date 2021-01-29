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

    this.products = this._user.productsList()
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

    !('productHighlights' in this.data) && (this.data.productHighlights = [])

    this.data.productHighlights.push(this.highlights_form.value.highlight)

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
    this.data.productHighlights.splice(i, 1)
  }

  onNext(){
    // res = this._user.serchByKeyword()
    this.data = this._user.apiData("/ip/Sony-PlayStation-4-500GB-Slim-System-Black/406966077")
  }

}

class Feature {
  name: string;
  value: string
}
