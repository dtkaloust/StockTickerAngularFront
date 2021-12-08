import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() canRemove: boolean;
  @Output() deleted: EventEmitter<{ feedName: String; stockName: String }> =
    new EventEmitter();
  constructor() {}

  displayedColumns: String[] = ['logo', 'name', 'price', 'marketCap', 'delete'];
}
