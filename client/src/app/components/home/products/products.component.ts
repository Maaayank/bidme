import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../services/data.service'
import { ProductService } from 'src/app/services/product.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'homepage-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  details: any;
  products: Products[] = []

  constructor(
    private _user: UserService,
    private _toastr: ToastrService,
    private _dataService: DataService,
    private _productService: ProductService,
    private _fireService: FirebaseService
  ) { }

  ngOnInit(): void {

    this._productService.fetchProduct().subscribe(
      (data: any) => {

        this.products = data.products;
        for (var product of this.products) {
          if ('images' in product) {
            console.log('yaa hello')
            this.retrieveDownloadLink(product);
          }
        }
      }, (err) => {
        console.error(err);
      }
    )
  }

  retrieveDownloadLink(product: any) {

    if (product.images.length > 0) {
      console.log('yaa hello again ')
      this._fireService.getDownloadUrl(product.images[0]).subscribe(
        (data: any) => {
          product['image'] = data
          console.log(this.products);
        },

        (err) => {
          console.error(err);
        }
      )
    }

  }
}

interface Products {

}
