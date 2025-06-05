import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from './buildings.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuildingsService {
  private baseUrl = `${environment.apiBaseUrl}/buildings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Building[]> {
    return this.http.get<Building[]>(this.baseUrl);
  }

  create(building: Omit<Building, 'id'>): Observable<any> {
    return this.http.post(this.baseUrl, building);
  }

  update(id: number, building: Partial<Building>): Observable<any> {
    const updatedBody = { ...building, id };
    return this.http.put(`${this.baseUrl}/${id}`, updatedBody);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
