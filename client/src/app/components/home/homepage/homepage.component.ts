import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  out: Boolean = true;

  product: Product = {
    productFeatures: [],
    productTitle: null,
    productHiglight: [],
    manufacturer: null,
    description: "",
    price: null,
    images: [],
    pickup_address: {lat: '0', lon: '0'}
  }

  details: Details = {
    auctionAmount: 0,
    startsAt: null,
    endsAt: null,
    title: ""
  }


  constructor(
    private _user: UserService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onClear() {
    //todo : nothing for now
  }

  onNext(details: any) {
    console.log(details)
    this.details = details
    this.out = false;

    if (details.title == details.selectedProduct) {
      this._toastr.info("", "Fetching Details")

      this._user.productDetails(details.selectedProduct.pid).subscribe(

        (data: any) => {
          this.product.productTitle = data.product.productTitle
          this.product.price = data.product.price
          this.product.productHiglight = data.product.productHiglight
          this._toastr.success("", "Details Fetched")
        },

        error => {
          this._toastr.error("", error.error.msg)
        }
      )
    } else {
      this.product.productTitle = details.title
    }
  }

  submit(productDetails) {

    var images = []
    productDetails.images.forEach((image: Image) => {
      images.push(image.path)
    });

    var data = {
      price: productDetails.price,
      productHiglight: productDetails.productHiglight,
      productFeatures: productDetails.productFeatures,
      productTitle: productDetails.productTitle,
      manufacturer: productDetails.manufacturer,
      productDescription: productDetails.description,
      auctionAmount: this.details.auctionAmount,
      startsAt: this.details.startsAt.getTime(),
      endsAt: this.details.endsAt.getTime(),
      images: images
    }



    this._user.submitProduct(data).subscribe(
      (data: any) => {
        this._toastr.success("", data.msg)
      },

      error => {
        this._toastr.error("", error.error.msg)
      }
    )
  }
}

interface Details {
  auctionAmount: Number;
  startsAt: Date;
  endsAt: Date;
  title: String;
}

interface Product {
  productTitle: String;
  productHiglight: String[];
  productFeatures: JSON[];
  price: String;
  manufacturer: String;
  description: String;
  images: Image[];
  pickup_address: Address
}

interface Image {
  url: String,
  path: String
}

interface Address {
  lat: String,
  lon: String
}
