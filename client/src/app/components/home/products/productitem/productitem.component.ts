import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'products-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements AfterViewInit {

  @Input('product')
  product: Product;

  constructor(
    private _firebaseService: FirebaseService
  ) { }

  ngAfterViewInit():void {
    if('images' in this.product){
      this.retrieveDownloadLink()
    }
  }

  retrieveDownloadLink() {

    if (this.product.images.length > 0) {
      console.log('yaa hello again ')
      this._firebaseService.getDownloadUrl(this.product.images[0]).subscribe(
        (data: any) => {
          this.product['image'] = data
          console.log(this.product);
        },

        (err) => {
          console.error(err);
        }
      )
    }

  }
}

interface Product {
  productTitle: String;
  productHiglight: String[];
  productFeatures: JSON[];
  auctionAmount: Number
  price: String;
  manufacturer: String;
  description: String;
  images: String[];
  pickup_address: Address;
  image: string
}

interface Address {
  lat: String,
  lon: String
}
