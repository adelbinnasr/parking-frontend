// src/app/features/settings/flats/flats.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Flat {
  id: number;
  buildingId: number;
  flatNumber: string;
  subscriberId: number;
  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
  updatedBy?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FlatsService {
  private apiUrl = `${environment.apiBaseUrl}/flats`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Flat[]> {
    return this.http.get<Flat[]>(this.apiUrl);
  }

  getById(id: number): Observable<Flat> {
    return this.http.get<Flat>(`${this.apiUrl}/${id}`);
  }

  create(flat: Partial<Flat>): Observable<Flat> {
    return this.http.post<Flat>(this.apiUrl, flat);
  }

  update(id: number, flat: Partial<Flat>): Observable<Flat> {
    return this.http.put<Flat>(`${this.apiUrl}/${id}`, flat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
