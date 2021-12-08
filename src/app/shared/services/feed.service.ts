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

  removeTicker(feedName: String, stockName: String): Observable<Feed> {
    let params = new HttpParams();
    params = params.append('feedName', String(feedName));
    params = params.append('stockName', String(stockName));
    return this.http.delete<Feed>(`${this.getUrl()}custom/remove`, {
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

  trackNewFeed(feedName: String): Observable<Feed> {
    let params = new HttpParams();
    params = params.append('feedName', String(feedName));
    return this.http.post<Feed>(`${this.getUrl()}tracked/add`, '', {
      params,
    });
  }

  getAllPublicFeeds(): Observable<String[]> {
    return this.http.get<String[]>(`${this.getUrl()}all`);
  }

  removeTrackedFeed(feedName: String): Observable<Feed> {
    let params = new HttpParams();
    params = params.append('feedName', String(feedName));
    return this.http.delete<Feed>(`${this.getUrl()}tracked/remove`, {
      params,
    });
  }

  private getUrl() {
    return `${BASE_URL}`;
  }
}
