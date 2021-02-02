import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  title = "hello"
  example: string = "hello"
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
    private _dataService: DataService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
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

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
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
    this.out = false;
    console.log(this.title)
    this._user.productSearchByKeywords(this.title).subscribe(

      (data: any) => {
        console.log(data.productsTitles[0])
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
