import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Subscription, interval } from 'rxjs';
import { Product, Address } from '../../../../interfaces'

@Component({
  selector: 'products-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements AfterViewInit, OnDestroy {

  @Input('product')
  product: Product;

  auctionStatus: String = ""
  private subscription: Subscription;

  constructor(
    private _firebaseService: FirebaseService
  ) { }

  ngAfterViewInit(): void {

    this.bidStatus(this.product.startsAt, this.product.endsAt)
    if ('images' in this.product) {
      this.retrieveDownloadLink()
    }
  }

  retrieveDownloadLink() {

    if (this.product.images.length > 0) {
      console.log('yaa hello again ')
      this._firebaseService.getDownloadUrl(this.product.images[0]).subscribe(
        (data: any) => {
          this.product['image'] = data
          console.log(this.product);
        },

        (err) => {
          console.error(err);
        }
      )
    }
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
          diff = this.getTimeDifference(endsAt)
          totalSeconds = diff / 1000;
          totalMinutes = totalSeconds / 60;
          seconds = Math.floor(totalSeconds) % 60;
          minutes = Math.floor(totalMinutes) % 60;
          this.auctionStatus = `STARTS IN ${minutes} MINUTES ${seconds} SECONDS`
        })
      }
    } else if (now > startsAt && now < endsAt) {

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

  private getTimeDifference(time) {
    return time - Date.now()
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe()
  }
}
