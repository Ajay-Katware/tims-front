import { Injectable } from '@angular/core';
import { RestApi } from '../api/rest-api';
import { DashboardCounter } from '../models/dashboard-counter';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  api = new RestApi();
  constructor(private httpClient : HttpClient) { }


  getCounters(): Observable<DashboardCounter> {
    return this.httpClient.get<DashboardCounter>(this.api.COUNTER_URL);
  }
}
