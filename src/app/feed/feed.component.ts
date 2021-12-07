import { Component, Input, OnInit } from '@angular/core';
import { Feed } from '../shared/interfaces/feed';
import { StockService } from '../shared/services/stock.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  @Input() feed: Feed;
  @Input() priceList;
  @Input() isAuth: boolean;
  constructor() {}

  displayedColumns: String[] = ['logo', 'name', 'price', 'marketCap', 'delete'];
}
