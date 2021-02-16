import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/data.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'homepage-expandedform',
  templateUrl: './expandedform.component.html',
  styleUrls: ['./expandedform.component.css']
})
export class ExpandedFormComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  private geoCoder; 

  @ViewChild('search')
  public searchElementRef: ElementRef;

  feature_form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  })

  highlights_form: FormGroup = new FormGroup({
    highlight: new FormControl('', [Validators.required])
  })

  @Input('product')
  product: Product;

  @Output() submit: EventEmitter<any> = new EventEmitter();

  constructor(
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
    this.submit.emit(this.product)
  }
}

interface Product {
  productTitle: String;
  productHiglight: String[];
  productFeatures: JSON[];
  price: String;
  manufacturer: String;
  description: String
}
