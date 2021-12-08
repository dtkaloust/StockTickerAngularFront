import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Feed } from '../shared/interfaces/feed';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent {
  constructor() {}
  @Input() feedItemList: Feed[];
  @Input() displayedColumns: String[];
  @Input() isActive;
  @Input() selectedFeed: Feed;
  @Output() selected: EventEmitter<Feed> = new EventEmitter();
  @Output() deleted: EventEmitter<String> = new EventEmitter();
  @Output() changeStatus: EventEmitter<String> = new EventEmitter();
}
