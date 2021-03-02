import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

declare const L: any;

@Component({
  selector: 'homepage-expandedform',
  templateUrl: './expandedform.component.html',
  styleUrls: ['./expandedform.component.css']
})
export class ExpandedFormComponent implements OnInit, AfterViewInit {

  feature_form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  })

  highlights_form: FormGroup = new FormGroup({
    highlight: new FormControl('', [Validators.required])
  })

  @Input('product')
  product: Product;

  @Output() submitProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private _toastr: ToastrService,
    private _firebaseService: FirebaseService,
    private _user: UserService
  ) { }

  ngAfterViewInit() {

    navigator.geolocation.getCurrentPosition((position) => {

      const coord = position.coords;
      console.log(`lat:${position.coords.latitude},lon:${position.coords.longitude}`);
      
      this.product.pickup_address.lat = String(coord.latitude)
      this.product.pickup_address.lon = String(coord.longitude)
      // this._user.mapcall(coord.latitude, coord.longitude).subscribe((data) => {
      //   console.warn("get api data", data);
      // })

      var mymap = L.map('map').setView([coord.latitude, coord.longitude], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhc2hhbiIsImEiOiJja2xramhxYnowMTJ4Mm9sbHV0a2thazdlIn0.IVDzeLAlaMW1pJvkAgjnVQ', {
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(mymap);

      L.marker([coord.latitude, coord.longitude]).addTo(mymap);

    });
  }

  ngOnInit(): void {
  }

  addFeature() {

    if (this.product['productFeatures'] == undefined) {
      this.product.productFeatures = []
    }

    this.product.productFeatures.push(this.feature_form.value)
    this.feature_form.setValue({
      name: "",
      value: ""
    })
  }

  addHighlight() {

    if (this.product['productHiglight'] == undefined) {
      this.product.productHiglight = []
    }

    this.product.productHiglight.push(this.highlights_form.value.highlight)
    this.highlights_form.setValue({
      highlight: ""
    })
  }

  removeFeature(i) {
    this.product.productFeatures.splice(i, 1);
  }

  removeField(key: string) {
    delete this.product[key];
  }

  removeHighLight(i) {
    this.product.productHiglight.splice(i, 1)
  }

  productChange() {
    console.log("product change")
    this.submitProduct.emit(this.product)
  }

  addImage(data) {

    const files = data.target.files
    const file: File = files[0]
    const path = `/product/${file.name}`

    if (this.product.images.length < 5) {
      if (file.size < 5 * 1024 * 1024) {

        this._toastr.info(`Uploading ${file.name}`)
        this._firebaseService.uploadFile(path, file).then(

          (res: String) => {
            console.log(res)
            var newImage: Image = {
              url: res,
              path: path
            }

            this.product.images.push(newImage)
          },

          (err: any) => {
            console.log(err)
            this._toastr.error(`Error while uploading ${file.name}`)
          }

        )
      } else {
        this._toastr.error("Please Upload an Image of size less than 5MB")
      }
    } else {
      this._toastr.error("Max 5 images allowed ")
    }
  }

  removeImage(i) {
    this._firebaseService.deleteFile(this.product.images[i].path)
    this.product.images.splice(i, 1)
  }

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
