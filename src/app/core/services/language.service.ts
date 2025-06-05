// src/app/core/services/language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment'; // ✅ Import environment


@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    const lang = localStorage.getItem('lang') || 'en';
    this.setLanguage(lang);
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);

    // Set direction
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }

  getCurrentLang(): string {
    return this.translate.currentLang || 'en';
  }

  toggleLanguage() {
    const newLang = this.getCurrentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
}
