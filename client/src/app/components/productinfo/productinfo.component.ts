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
  check:boolean=true;
  status_check:string="";
  isDisabled:boolean=true;
  err_msg:string;
  wallet:String;
  check1:string;
  //btnD:boolean

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

    this._dataService.wallet.subscribe(wallet => this.wallet = wallet)

    this._route.params.subscribe(params => {
      this._productservice.fetchProductDetail(params['pid']).subscribe(
        (data: any) => {
          console.log(data.product)
          this.bids = data.bids
          if(Object.keys(this.bids).length === 0){
            //console.log("empty");
            this.check=false;
          }
          else{
            //console.log(this.bids);
            this.check=true;
          }

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
      this.startsIn(startsAt, endsAt)

    } else if (now > startsAt && now < endsAt) {
      this.endsIn(startsAt, endsAt)

    } else {
      this.ended()
    }
  }

  private startsIn(startsAt, endsAt) {
    this.status_check="btn btn-primary p-3 w-100 m-1"

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
        if (diff <= 0) {
          this.endsIn(startsAt, endsAt)
          this.subscription.unsubscribe()
        }
        totalSeconds = diff / 1000;
        totalMinutes = totalSeconds / 60;
        seconds = Math.floor(totalSeconds) % 60;
        minutes = Math.floor(totalMinutes) % 60;
        this.auctionStatus = `STARTS IN ${minutes} MINUTES ${seconds} SECONDS`
      })
    }
  }

  private endsIn(startsAt, endsAt) {

    this.status_check="btn btn-success p-3 w-100 m-1";

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

        if (diff <= 0) {
          this.auctionStatus = 'ENDED'
          this.subscription.unsubscribe()
        } else {
          totalSeconds = diff / 1000;
          totalMinutes = totalSeconds / 60;
          seconds = Math.floor(totalSeconds) % 60;
          minutes = Math.floor(totalMinutes) % 60;
          this.auctionStatus = `ENDS IN ${minutes} MINUTES ${seconds} SECONDS`
        }
      })
    }
  }

  private ended() {
    this.status_check="btn btn-danger p-3 w-100 m-1"
    this.auctionStatus = "Ended"
  }

  private subscribeToBidUpdates() {
    this._auctionService.onBidUpdates(this.product.pid).subscribe((res: any) => {
      this.bids = res.bids
      if (res.auctionAmount > 0)
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
    if(this.bidPlaced===undefined){
      this._toastr.error(`Field Cannot be empty`);
      this.err_msg="Field Cannot be empty"
    // console.log(this.product.auctionAmount);
    // console.log(this.wallet);
    // console.log(this.bidPlaced);
    }else if(this.bidPlaced>parseInt(JSON.stringify(this.wallet))){
      this._toastr.error(`Entered Amount is more than your wallet`);
      this.err_msg="Entered Amount is more than your wallet"
    }else if((this.bidPlaced+this.product.prevBid)<this.product.auctionAmount){
      this._toastr.error(`Bid Amount is less`);
      this.err_msg="Bid Amount is less";
    }else{
      this._toastr.info(`Bid submitted of  ${this.bidPlaced}`)
      this._productservice.bidOnProduct(data).subscribe(
      (res: any) => {
        this._dataService.changeWallet(res.wallet)
        this._toastr.success(res.msg)
        this._toastr.info(`Transaction: ${res.tid}`)
        this.product.prevBid = res.bidded
        this.check=true;
      },
      (err) => {
        this._toastr.error(err.error.msg)
      }
    )
    }



  }

  ngOnDestroy() {

    if (this.subscription)
      this.subscription.unsubscribe();

    this._auctionService.disconnectSocket()
  }
}
