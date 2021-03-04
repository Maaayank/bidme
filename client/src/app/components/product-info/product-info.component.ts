import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products2.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  //image=[];
  data:Product;
  //image:
  constructor(private product2service : ProductService) {  
    // this.data={	
	//   auction_price : '120 R',
	//   flipcart_price : '120 R',
	//   features : 'this is real',
	//   description : 'this is real',
	//   highlights : 'this is real',		
    //   image:["https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg",
    //   "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunflower-1508785046.jpg",
    //   "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg",
    //   "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg"
    //  ]
    // };

  }
  	
  ngOnInit(): void {
	  this.product2service.fetchProductDetail(68555).subscribe(
		  (data:any) => {
			  console.log(data.product)
			  this.data = data.product
			  for(let prod of this.data.productHiglight){
				  console.log(prod)
			  }
			},
		  (err:any) => {console.log(err)}
	  )
    // let thumbnails = document.getElementsByClassName('thumbnail')

	// 	let activeImages = document.getElementsByClassName('active')

	// 	for (var i=0; i < thumbnails.length; i++){

	// 		thumbnails[i].addEventListener('mouseover', function(){
	// 			console.log(activeImages)

	// 			if (activeImages.length > 0){
	// 				activeImages[0].classList.remove('active')
	// 			}
	// 			this.classList.add('active')
	// 			document.getElementById('featured').src = this.src
	// 		})
	// 	}


	// 	let buttonRight = document.getElementById('slideRight');
	// 	let buttonLeft = document.getElementById('slideLeft');

	// 	buttonLeft.addEventListener('click', function(){
	// 		document.getElementById('slider').scrollLeft -= 180
	// 	})

	// 	buttonRight.addEventListener('click', function(){
	// 		document.getElementById('slider').scrollLeft += 180
	// 	})

	  

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
