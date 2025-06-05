import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tariff } from './tariffs.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TariffsService {
   private apiUrl = `${environment.apiBaseUrl}/Tariffs`;

  constructor(private http: HttpClient) {}

  getAllTariffs(filterParams?: { statusId?: number; search?: string }): Observable<Tariff[]> {
    let params = new HttpParams();
    if (filterParams?.statusId) params = params.set('statusId', filterParams.statusId);
    if (filterParams?.search) params = params.set('search', filterParams.search);
    return this.http.get<Tariff[]>(this.apiUrl, { params });
  }

  createTariff(tariff: Partial<Tariff>): Observable<any> {
    return this.http.post(this.apiUrl, tariff);
  }

  updateTariff(id: number, tariff: Partial<Tariff>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tariff);
  }

  deleteTariff(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
