import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SubscriberType } from './subscriber-types.model';


@Injectable({ providedIn: 'root' })
export class SubscriberTypeService {
  private baseUrl = `${environment.apiBaseUrl}/subscriberTypes`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<SubscriberType[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<SubscriberType>(`${this.baseUrl}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
