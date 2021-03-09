import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../interfaces'

@Component({
  selector: 'homepage-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  details: any;
  products: Product[] = []

  constructor(
    private _productService: ProductService,
    public router: Router,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this._productService.fetchProduct().subscribe(
      (data: any) => {

        this.products = data.products;
      }, (err) => {
        console.error(err);
      }
    )
  }

  cardClicked(pid){
      this.router.navigate(['/product', pid]);
  }
}
