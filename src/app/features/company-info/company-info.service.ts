import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyInfo } from './company-info.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {
  // private baseUrl = '/api/companyinfo';
   private baseUrl = `${environment.apiBaseUrl}/companyinfo`;

  constructor(private http: HttpClient) {}

  get(): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(this.baseUrl);
  }

  update(id: number, data: CompanyInfo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  create(data: CompanyInfo): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
