import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/products2.service';

@Component({
	selector: 'app-product-info',
	templateUrl: './product-info.component.html',
	styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

	data: Product;

	constructor(
		private product2service: ProductService,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {

		this._route.params.subscribe(params => {
			this.product2service.fetchProductDetail(params['pid']).subscribe(
				(data: any) => {
					console.log(data.product)
					this.data = data.product
					for (let prod of this.data.productHiglight) {
						console.log(prod)
					}
				},
				(err: any) => { console.log(err) }
			)
		});
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
	productDescription: String;
	images: String[];
	pickup_address: Address;
	image: string
}

interface Address {
	lat: String,
	lon: String
}
