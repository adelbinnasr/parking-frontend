// src/app/core/services/language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private supportedLangs: ('en' | 'ar')[] = ['en', 'ar'];

  constructor(private translate: TranslateService) {
    const browserLang = this.getStoredLang() || this.translate.getBrowserLang() || 'en';
    this.setLanguage(browserLang as 'en' | 'ar');
  }

  setLanguage(lang: 'en' | 'ar') {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
  }

  toggleLanguage() {
    const currentLang = this.getCurrentLang();
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  getCurrentLang(): 'en' | 'ar' {
    return (this.translate.currentLang as 'en' | 'ar') || 'en';
  }

  private getStoredLang(): string | null {
    return localStorage.getItem('lang');
  }
}
