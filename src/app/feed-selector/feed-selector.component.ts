import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feed } from '../shared/interfaces/feed';
import { FeedService } from '../shared/services/feed.service';

@Component({
  selector: 'app-feed-selector',
  templateUrl: './feed-selector.component.html',
  styleUrls: ['./feed-selector.component.scss'],
})
export class FeedSelectorComponent implements OnInit {
  constructor(private feedService: FeedService) {}
  @Input() customFeedList: Feed[];
  @Input() trackedFeedList: Feed[];
  @Output() selected: EventEmitter<Feed> = new EventEmitter();
  @Output() retrieveCustomFeeds = new EventEmitter();
  newFeedName: String;

  onCreateFeed(form: NgForm) {
    this.feedService.createNewCustomFeed(this.newFeedName).subscribe((val) => {
      this.retrieveCustomFeeds.next();
    });
  }

  onDeleteFeed(feedName: String) {
    this.feedService.deleteCustomFeed(feedName).subscribe((val) => {
      this.retrieveCustomFeeds.next();
    });
  }

  onChangeStatus(feedName: String) {
    this.feedService.changeStatus(feedName).subscribe((val) => {
      this.retrieveCustomFeeds.next();
    });
  }

  ngOnInit(): void {}
}
