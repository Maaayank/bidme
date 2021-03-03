import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'feed-container',
    templateUrl: './feeds.component.html',
    styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

    feedsLoading: Boolean = false;
    feedVisible: Boolean = true;
    feeds: Feed[] = []

    constructor(
        private _feedService: FeedsService,
        private _dataService: DataService
    ) { }

    ngOnInit() {
        this._dataService.feed.subscribe(feed => this.feedVisible = feed)
        this.feedsLoading = true
        this._feedService.fetchFeeds().subscribe(

            (data: any) => {
              console.log(data);
                this.feeds = data.feeds
                this.feedsLoading = false
            },

            error => {
                this.feedsLoading = false
                console.log(error)
            }
        )



    }

    toggleFeed() {
        if (this.feedVisible) {
            this._dataService.toggleFeed(false)
        }
        else {
            this._dataService.toggleFeed(true)
        }
    }
}

class Feed {

}
