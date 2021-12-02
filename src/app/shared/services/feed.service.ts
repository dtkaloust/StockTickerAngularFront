import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from '../interfaces/feed';

const BASE_URL = 'http://localhost:8080/api/v1/feed/';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  retrieveCustomFeeds(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.getUrl()}custom/retrieve`);
  }

  retrieveTrackedFeeds(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.getUrl()}tracked/retrieve`);
  }

  retrieveDefaultFeed(): Observable<Feed> {
    return this.http.get<Feed>(`${this.getUrl()}default/retrieve`);
  }

  private getUrl() {
    return `${BASE_URL}`;
  }
}
