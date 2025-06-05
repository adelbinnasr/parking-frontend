import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from './plans.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlansService {
  private apiUrl = `${environment.apiBaseUrl}/plans`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }

  getById(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.apiUrl}/${id}`);
  }

  create(plan: Plan): Observable<any> {
    return this.http.post(this.apiUrl, plan);
  }

  update(id: number, plan: Plan): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, plan);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
