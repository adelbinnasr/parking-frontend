import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { GeneralStatus } from './general-statuses.model';

@Injectable({ providedIn: 'root' })
export class GeneralStatusService {
  private apiUrl = `${environment.apiBaseUrl}/GeneralStatuses`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<GeneralStatus[]> {
    return this.http.get<GeneralStatus[]>(this.apiUrl);
  }

  create(status: Partial<GeneralStatus>): Observable<any> {
    return this.http.post(this.apiUrl, status);
  }

  update(id: number, status: Partial<GeneralStatus>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, status);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
