import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feed } from '../shared/interfaces/feed';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit {
  constructor() {}
  @Input() feedItemList: Feed[];
  @Input() displayedColumns: String[];
  @Output() selected: EventEmitter<Feed> = new EventEmitter();
  @Output() deleted: EventEmitter<String> = new EventEmitter();
  @Output() changeStatus: EventEmitter<String> = new EventEmitter();
  selectedFeed: Feed;

  ngOnInit(): void {}
}
