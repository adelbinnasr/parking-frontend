import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from './setting.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private baseUrl = '/api/Settings';

  constructor(private http: HttpClient) {}

  // 🟢 Get all settings (optional: add filtering later)
getAll(buildingID: number): Observable<Setting[]> {
  return this.http.get<Setting[]>(`${this.baseUrl}?buildingId=${buildingID}`);
}

  // 🟢 Get settings for specific building
  getSettingsByBuilding(buildingID: number): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${this.baseUrl}?buildingId=${buildingID}`);
  }

  // 🟢 Get single setting
  getSetting(id: number): Observable<Setting> {
    return this.http.get<Setting>(`${this.baseUrl}/${id}`);
  }

  // 🟢 Create setting
 create(setting: Setting): Observable<any> {
  return this.http.post(this.baseUrl, setting);
}

  // 🟢 Update setting

update(id: number, setting: Setting): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, setting);
}

  // 🟢 Delete setting

delete(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}
}
