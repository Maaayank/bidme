import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'homepage-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  details: any;
  products: Products[] = []

  constructor(
    private _productService: ProductService,
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
}

interface Products {

}
