import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, TranslateModule,MatExpansionModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  subscriberTypes: any[] = [];
  currentLang: string = 'en';
  subscriberTypesInParking = this.subscriberTypes.filter(type => type.activeCount > 0);

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';

    this.fetchSubscriberTypes();


    // update language on switch
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });
  }

  fetchSubscriberTypes(): void {
    this.http.get<any[]>(`${environment.apiBaseUrl}/subscriberTypes`)
      .subscribe({
        next: (data) => {
          // if activeCount isn't included from backend, we can mock it like this:
          this.subscriberTypes = data.map(type => ({
            ...type,
            activeCount: this.getMockActiveCount(type.id) // Remove this if backend sends the value
          }));
        },
        error: (err) => {
          console.error('❌ Failed to load subscriber types', err);
          this.subscriberTypes = [];
        }
      });
  }

  // 🧪 Mock logic – REMOVE if real `activeCount` comes from backend
  getMockActiveCount(typeId: number): number {
    const mockMap: Record<number, number> = {
      1: 2, // Owner
      2: 0, // Manager
      3: 0, // General
      4: 1, // Employee
      5: 0  // Hotel Guest
    };
    return mockMap[typeId] || 0;
  }

  getTypeName(type: any): string {
    return this.currentLang === 'ar' ? type.nameAr : type.nameEn;
  }

  isActiveType(typeId: number): boolean {
    return this.router.url.includes(`/subscribers/type/${typeId}`);
  }
}
