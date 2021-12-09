import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Feed } from '../shared/interfaces/feed';
import { FeedService } from '../shared/services/feed.service';
import { StockService } from '../shared/services/stock.service';
import { environment } from 'src/environments/environment';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title: String = 'favoritestocktickerapp';
  constructor(
    private feedService: FeedService,
    private stockService: StockService,
    private router: Router,
    private auth: AuthService
  ) {
    this.mySubscription = interval(60000).subscribe((x) => {
      this.updatePrices();
    });
  }
  priceList = {};
  defaultFeed: Feed;
  customFeeds: Feed[];
  trackedFeeds: Feed[];
  currentFeed: Feed;
  mySubscription: Subscription;
  isAuthenticated: boolean = false;
  cognitoUser: CognitoUser;
  allTickers: String[];
  idToken;

  ngOnInit(): void {
    this.loadDefaultFeed();
    this.loadCustomFeeds();
    this.loadTrackedFeeds();

    this.isAuthenticated = this.auth.isLoggedIn();
    this.cognitoUser = this.auth.getUser() || null;
    this.idToken = this.auth.getIdToken();
  }

  loadDefaultFeed() {
    this.feedService.retrieveDefaultFeed().subscribe((feed) => {
      this.defaultFeed = feed;
      console.log(feed);
      this.setCurrentFeed(feed);
    });
  }

  loadTrackedFeeds() {
    this.feedService
      .retrieveTrackedFeeds()
      .subscribe((feeds) => (this.trackedFeeds = feeds));
  }

  loadCustomFeeds() {
    this.feedService.retrieveCustomFeeds().subscribe((feeds) => {
      this.customFeeds = feeds;
    });
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

  onLogout(): void {
    this.cognitoUser.signOut();
    this.isAuthenticated = false;
    window.location.reload();
  }

  onLogin(): void {
    this.router.navigate(['signin']);
  }

  clickHandler(): void {
    if (this.isAuthenticated) {
      this.onLogout();
    } else {
      this.onLogin();
    }
  }

  removeStock(event: { stockName: String; feedName: String }) {
    this.feedService
      .removeTicker(event.feedName, event.stockName)
      .subscribe((val) => {
        this.loadCustomFeeds();
        this.setCurrentFeed(val);
      });
  }

  addTickerToFeed(ticker: String): void {
    this.feedService
      .addTickerToFeed(ticker, this.currentFeed.name)
      .subscribe((val) => {
        this.loadCustomFeeds();
        this.setCurrentFeed(val);
      });
  }
}
