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
  @Output() retrieveTrackedFeeds = new EventEmitter();
  allPublicFeeds: String[];
  newTrackedFeedName: String;
  newFeedName: String;
  selectedFeed: Feed;

  onCreateFeed(form: NgForm) {
    this.feedService
      .createNewCustomFeed(form.form.value.newFeedName)
      .subscribe((val) => {
        this.retrieveCustomFeeds.next();
      });
  }

  onTabChange(item) {
    console.log(item);
  }

  onDeleteFeed(feedName: String) {
    this.feedService.deleteCustomFeed(feedName).subscribe((val) => {
      this.retrieveCustomFeeds.next();
    });
  }

  onRemoveFeed(feedName: String) {
    this.feedService.removeTrackedFeed(feedName).subscribe((val) => {
      this.retrieveTrackedFeeds.next();
    });
  }

  onChangeStatus(feedName: String) {
    this.feedService.changeStatus(feedName).subscribe((val) => {
      this.retrieveCustomFeeds.next();
    });
  }

  onTrackFeed(form: NgForm) {
    this.feedService
      .trackNewFeed(form.form.value.newTrackedFeedName)
      .subscribe((val) => {
        this.retrieveTrackedFeeds.next();
      });
  }

  updateSelectedFeed(feed: Feed) {
    this.selectedFeed = feed;
  }

  ngOnInit(): void {
    this.feedService.getAllPublicFeeds().subscribe((val) => {
      this.allPublicFeeds = val;
    });
  }
}
