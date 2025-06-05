import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subscriber } from './subscriber.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  private readonly apiUrl = `${environment.apiBaseUrl}/subscribers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.apiUrl);
  }

  getById(id: number): Observable<Subscriber> {
    return this.http.get<Subscriber>(`${this.apiUrl}/${id}`);
  }

  create(subscriber: Partial<Subscriber>): Observable<any> {
    return this.http.post(this.apiUrl, subscriber);
  }

  update(id: number, subscriber: Partial<Subscriber>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, subscriber);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // src/app/features/subscribers/subscriber.service.ts
getByType(typeId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/by-type/${typeId}`);
}

getSubscriberTypeById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/subscriberTypes/${id}`);
}

getCountByType(typeId: number) {
  return this.http.get<number>(`${this.apiUrl}/subscribers/count?typeId=${typeId}`);
}

getOverviewById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/overview/${id}`);
}


searchSubscribers(query: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`);
}

getSummary(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/summary`);
}



}
