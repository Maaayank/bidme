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
  details:any;
  products: Products[] = []

  constructor(
    private _user: UserService,
    private _toastr: ToastrService,
    private _dataService: DataService,
    private _productService:ProductService,
    private _fireService:FirebaseService
  ) {
    this.details={
      name:'Laptop',
      amount:'230.00',
      img:'../../../../assets/abstract-1867838_1920.jpg',
      features:[
        '2GB RAM DDR4',
        '1TB HDD'
      ]
    };
   }

  ngOnInit(): void {
    this._productService.fetchProduct().subscribe(
      (data:any)=>{
        console.log(data.products);
        this.products=data.products;

      },(err)=>{
        console.error(err);
      }
    )



  }
  compute(x:any){
    this._fireService.getDownloadUrl(x.images[0]).subscribe(
      (data:any)=>{
        x.images[0]=data;
        console.log(this.products)
      },(err)=>{
        console.error(err);
      }
    )
  }


}
class Products {

}
