import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Feed } from './shared/interfaces/feed';
import { FeedService } from './shared/services/feed.service';
import { StockService } from './shared/services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: String = 'favoritestocktickerapp';
  constructor(
    private feedService: FeedService,
    private stockService: StockService
  ) {
    this.mySubscription = interval(60000).subscribe((x) => {
      this.updatePrices();
    });
  }
  priceList = { AAPL: '11', FB: '15' };
  defaultFeed: Feed;
  customFeeds: Feed[];
  trackedFeeds: Feed[];
  currentFeed: Feed;
  mySubscription: Subscription;

  ngOnInit(): void {
    this.loadDefaultFeed();
  }

  loadDefaultFeed() {
    this.feedService.retrieveDefaultFeed().subscribe((feed) => {
      this.defaultFeed = feed;
      this.setCurrentFeed(feed);
    });
  }

  loadTrackedFeeds() {
    this.feedService
      .retrieveTrackedFeeds()
      .subscribe((feeds) => (this.trackedFeeds = feeds));
  }

  loadCustomFeeds() {
    this.feedService
      .retrieveCustomFeeds()
      .subscribe((feeds) => (this.customFeeds = feeds));
  }

  setCurrentFeed(feed: Feed) {
    this.currentFeed = feed;
    this.updatePrices();
  }

  updatePrices() {
    let tickersNeeded = this.currentFeed.stock.map((stock) => {
      return stock.ticker;
    });
    this.stockService.fetchPrices(tickersNeeded).subscribe((prices) => {
      for (let i = 0; i < prices.length; i++) {
        this.priceList[tickersNeeded[i]] = prices[i];
      }
    });
  }
}
