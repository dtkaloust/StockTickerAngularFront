import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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

  createNewCustomFeed(newFeedName: String): Observable<Feed> {
    let params = new HttpParams();
    params = params.append('feedName', String(newFeedName));
    return this.http.post<Feed>(`${this.getUrl()}custom/create`, '', {
      params,
    });
  }

  deleteCustomFeed(feedName: String) {
    let params = new HttpParams();
    params = params.append('feedName', String(feedName));
    return this.http.delete(`${this.getUrl()}custom/delete`, {
      params,
    });
  }

  changeStatus(feedName: String) {
    let params = new HttpParams();
    params = params.append('feedName', String(feedName));
    return this.http.put(`${this.getUrl()}custom/status`, '', {
      params,
    });
  }

  addTickerToFeed(ticker: String, feedName: String): Observable<Feed> {
    let params = new HttpParams();
    params = params.append('feedName', String(feedName));
    params = params.append('stockName', String(ticker));
    return this.http.post<Feed>(`${this.getUrl()}custom/add`, '', {
      params,
    });
  }

  private getUrl() {
    return `${BASE_URL}`;
  }
}
