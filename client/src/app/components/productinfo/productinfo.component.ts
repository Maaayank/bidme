import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuctionService } from 'src/app/services/auction.service';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Product, Bid, Address } from '../../interfaces/index'

declare const $: any

@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductInfoComponent implements OnInit, OnDestroy {

  product: Product;
  productImages: string[] = [];
  featuredImage: string = "";
  auctionStatus: String = ""
  priceExist: boolean = false
  bidOnGoing: boolean = true
  bids: Bid[] = []
  bidPlaced: number;
  totalBid: number;

  private subscription: Subscription;

  constructor(
    private _productservice: ProductService,
    private _route: ActivatedRoute,
    private _firebaseService: FirebaseService,
    private _auctionService: AuctionService,
    private _dataService: DataService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this._productservice.fetchProductDetail(params['pid']).subscribe(
        (data: any) => {
          console.log(data.product)

          this.bids = data.bids
          this.product = data.product
          if ('price' in this.product) {
            this.priceExist = true
          }

          this.getFirestoreLink(this.product.images)
          this.bidStatus(this.product.startsAt, this.product.endsAt)
        },
        (err: any) => { console.log(err) }
      )
    }
    );
  }

  async getFirestoreLink(images) {

    try {
      for (let image of images) {
        var url = await this._firebaseService.getDownloadUrl(image).toPromise()
        this.productImages.push(String(url))
        if (this.productImages.length == 1) {
          this.featuredImage = this.productImages[0]
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  changeImage(i) {
    this.featuredImage = this.productImages[i]
  }

  bidStatus(startsAt, endsAt) {
    var now = Date.now()
    if (now < startsAt) {

      var totalHours, totalMinutes, totalSeconds, hours, minutes, seconds, days;
      var diff = this.getTimeDifference(startsAt)

      totalSeconds = diff / 1000;
      totalMinutes = totalSeconds / 60;
      totalHours = totalMinutes / 60;
      days = Math.floor(totalHours / 24);

      seconds = Math.floor(totalSeconds) % 60;
      minutes = Math.floor(totalMinutes) % 60;
      hours = Math.floor(totalHours) % 60;

      if (days >= 1) {
        this.auctionStatus = `STARTS IN ${days} DAYS ${hours} HOURS`
      } else if (hours >= 1) {
        this.auctionStatus = `STARTS IN ${hours} HOURS ${minutes} MINUTES`
      } else {
        this.subscription = interval(1000).subscribe((x) => {
          diff = this.getTimeDifference(startsAt)
          totalSeconds = diff / 1000;
          totalMinutes = totalSeconds / 60;
          seconds = Math.floor(totalSeconds) % 60;
          minutes = Math.floor(totalMinutes) % 60;
          this.auctionStatus = `STARTS IN ${minutes} MINUTES ${seconds} SECONDS`
        })
      }
    } else if (now > startsAt && now < endsAt) {

      this._auctionService.connectToAuction()
      this.subscribeToBidUpdates()

      var totalHours, totalMinutes, totalSeconds, hours, minutes, seconds, days;
      var diff = this.getTimeDifference(endsAt)

      totalSeconds = diff / 1000;
      totalMinutes = totalSeconds / 60;
      totalHours = totalMinutes / 60;
      days = Math.floor(totalHours / 24);

      seconds = Math.floor(totalSeconds) % 60;
      minutes = Math.floor(totalMinutes) % 60;
      hours = Math.floor(totalHours) % 24;

      if (days >= 1) {
        this.auctionStatus = `ENDS IN ${days} DAYS ${hours} HOURS`
      } else if (hours >= 1) {
        this.auctionStatus = `ENDS IN ${hours} HOURS ${minutes} MINUTES`
      } else {
        this.subscription = interval(1000).subscribe((_) => {
          diff = this.getTimeDifference(endsAt)
          totalSeconds = diff / 1000;
          totalMinutes = totalSeconds / 60;
          seconds = Math.floor(totalSeconds) % 60;
          minutes = Math.floor(totalMinutes) % 60;
          this.auctionStatus = `ENDS IN ${minutes} MINUTES ${seconds} SECONDS`
        })
      }
    } else {
      this.auctionStatus = "Ended"
    }
  }

  // openModal() {
  //   $('#bidDialog').modal('show')
  //   console.log('openModal')
  // }

  private subscribeToBidUpdates() {
    this._auctionService.onBidUpdates(this.product.pid).subscribe((res: any) => {
      this.bids = res.bids
      if(res.auctionAmount > 0)
        this.product.auctionAmount = res.auctionAmount
    })
  }

  private getTimeDifference(time) {
    return time - Date.now()
  }

  bid() {

    var data = {
      bid: this.bidPlaced,
      pid: this.product.pid
    }

    this._toastr.info(`Bid submitted of  ${this.bidPlaced}`)
    this._productservice.bidOnProduct(data).subscribe(
      (res: any) => {
        this._dataService.changeWallet(res.wallet)
        this._toastr.success(res.msg)
        this._toastr.info(`Transaction: ${res.tid}`)
        this.product.prevBid = res.bidded
      },
      (err) => {
        this._toastr.error(err.error.msg)
      }
    )
  }

  ngOnDestroy() {

    if(this.subscription)
      this.subscription.unsubscribe();

    this._auctionService.disconnectSocket()
  }
}