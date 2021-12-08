import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/v1/stock/';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  fetchPrices(tickers: String[]): Observable<String[]> {
    let params = new HttpParams();
    params = params.append('tickers', String(tickers));
    return this.http.get<String[]>(`${this.getUrl()}prices`, {
      params,
    });
  }

  getAllTickers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.getUrl()}all`);
  }

  private getUrl() {
    return `${BASE_URL}`;
  }
}
