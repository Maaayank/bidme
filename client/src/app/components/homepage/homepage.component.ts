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

  data = {
    productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
    manufacturer: "X Rocker ",
    price: 108,
    productHighlights: [
      "Dimensions: 27.36L x 22.44W x 19.69H in",
      "Long-lasting plastic frame",
      "Breathable black fabric",
      "Swivel and rocker pedestal base",
      "Bluetooth speakers and subwoofer"
    ],
    productDetails: [
      {
        "name": "Brand",
        "value": "X Rocker"
      },
      {
        "name": "Age Group",
        "value": "Adult Teen Child"
      },
      {
        "name": "Features",
        "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
      },
      {
        "name": "Color",
        "value": "Black"
      }
    ]
  }

  constructor(
    private _user: UserService,
    private _toastr: ToastrService,
    private _dataService: DataService
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

  addFeature() {
    this.data.productDetails.push(this.feature_form.value)
    this.feature_form.setValue({
      name: "",
      value: ""
    })
  }

  addHighlight() {
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

}

class Feature {
  name: string;
  value: string
}
