import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
    public router: Router,
    private _userService:UserService,
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
    if(this._userService.checkL){
      this.router.navigate(['/product', pid]);
    }else{
      this._toastr.info("", "Please Signin to Continue")
      this.router.navigate(['/login']);
    }

  }
}

interface Products {

}
