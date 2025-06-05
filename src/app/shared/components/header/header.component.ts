// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { formatDate } from '@angular/common';
// import { LanguageService } from '../language.service';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../../environments/environment';
// import { MatIconModule } from '@angular/material/icon';
// import { TranslateModule } from '@ngx-translate/core';


// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule, MatIconModule,TranslateModule],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss'],
// })

// export class HeaderComponent implements OnInit {
//   gregorianDate = '';
//   hijriDate = '';
//   currentTime = '';
//   announcement = '🚗🚗 This is a scrollable announcement message from Parking Administration';

//   private languageService = inject(LanguageService);
//   currentLang: string = this.languageService.getCurrentLang() || 'ar';

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.currentLang = this.languageService.getCurrentLang();
//     this.updateDateTime();
//     setInterval(() => this.updateDateTime(), 1000);
//   }

//   updateDateTime(): void {
//     const now = new Date();
//     this.gregorianDate = formatDate(now, 'dd/MM/yyyy', 'en');
//     this.currentTime = formatDate(now, 'hh:mm a', 'en');
//     this.hijriDate = this.getHijriDate();
//   }

//   getHijriDate(): string {
//     // Temporary placeholder — should use an API or Hijri library in production
//     return '14/10/1446';
//   }

//   changeLang(lang: string): void {
//     this.currentLang = lang;
//     this.languageService.setLanguage(lang as 'en' | 'ar');
//     document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
//   }

//   onLangChange(event: Event): void {
//     const value = (event.target as HTMLSelectElement).value;
//     this.changeLang(value);
//   }


//   triggerUpload(): void {
//     const input = document.getElementById('excelUpload') as HTMLInputElement;
//     if (input) input.click();
//   }

//   onFileSelected(event: any): void {
//     const file: File = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);

//       // Send to backend
//       this.http.post(`${environment.apiBaseUrl}/ParkingTransactions/upload-excel`, formData)
//       .subscribe({
//           next: (res) => console.log('Upload success:', res),
//           error: (err) => console.error('Upload error:', err)
//         });
//     }
//   }


// }


import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { LanguageService } from '../language.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>(); // 🔸 ADD THIS
  private languageService = inject(LanguageService);
  gregorianDate = '';
  hijriDate = '';
  currentTime = '';
  announcement = '🚗🚗 This is a scrollable announcement message from Parking Administration';
  currentLang: string = this.languageService.getCurrentLang() || 'ar';



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLang();
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime(): void {
    const now = new Date();
    this.gregorianDate = formatDate(now, 'dd/MM/yyyy', 'en');
    this.currentTime = formatDate(now, 'hh:mm a', 'en');
    this.hijriDate = this.getHijriDate();
  }

  getHijriDate(): string {
    return '14/10/1446'; // ⛔️ Placeholder
  }

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.languageService.setLanguage(lang as 'en' | 'ar');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  onLangChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.changeLang(value);
  }

  triggerUpload(): void {
    const input = document.getElementById('excelUpload') as HTMLInputElement;
    if (input) input.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post(`${environment.apiBaseUrl}/ParkingTransactions/upload-excel`, formData).subscribe({
        next: (res) => console.log('Upload success:', res),
        error: (err) => console.error('Upload error:', err),
      });
    }
  }

  // 🔸 Add this method for the mobile menu icon
  toggleSidebar() {
    this.menuToggle.emit();
  }

  get isMobile(): boolean {
    return window.innerWidth < 768;
  }

}
