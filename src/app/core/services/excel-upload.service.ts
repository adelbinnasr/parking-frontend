import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // ✅ Import environment

@Injectable({
  providedIn: 'root'
})
export class ExcelUploadService {
  private uploadUrl = `${environment.apiBaseUrl}/ParkingTransactions/upload-excel`;

  constructor(private http: HttpClient) {}

  uploadExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData);
  }
}
