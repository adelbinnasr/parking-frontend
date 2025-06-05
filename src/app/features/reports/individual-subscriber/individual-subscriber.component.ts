import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpClient } from '@angular/common/http';
import { CompanyInfo } from '../../company-info/company-info.model';
import { SubscribersService } from '../../subscribers/subscriber.service';
import { environment } from '../../../../environments/environment.prod';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-individual-subscriber',
  templateUrl: './individual-subscriber.component.html',
  styleUrls: ['./individual-subscriber.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslateModule
  ]
})
export class IndividualSubscriberComponent implements OnInit {
  selectedSubscriber: any = null;
  isLoading = false;
  now: Date = new Date();
  companyInfo: CompanyInfo | null = null;

  searchText: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;

  constructor(
    private subscribersService: SubscribersService,
    private http: HttpClient,
    private route: ActivatedRoute,
     public translate: TranslateService
  ) {}

ngOnInit(): void {
  this.loadCompanyInfo();

  // 👇 Always subscribe to queryParams to catch the ID
  this.route.queryParams.subscribe(params => {
    const subscriberId = params['id'];
    if (subscriberId) {
      this.loadSubscriberOverview(+subscriberId);
    }
  });
}



  loadCompanyInfo(): void {
    this.http.get<CompanyInfo>(`${environment.apiBaseUrl}/companyinfo`).subscribe({
      next: (data) => this.companyInfo = data,
      error: () => this.companyInfo = null
    });
  }

  onSearch(): void {
    const query = this.searchText.trim();
    if (!query) return;

    this.isLoading = true;

    this.subscribersService.searchSubscribers(query).subscribe(results => {
      if (results.length > 0 && results[0].id) {
        this.subscribersService.getOverviewById(results[0].id).subscribe(overview => {
          this.selectedSubscriber = overview;
          this.isLoading = false;
        });
      } else {
        this.selectedSubscriber = null;
        this.isLoading = false;
      }
    });
  }

  exportToExcel(): void {
    if (!this.selectedSubscriber?.transactions?.length) return;

    const data = this.selectedSubscriber.transactions.map((tx: any, index: number) => ({
      '#': index + 1,
      'Card ID': tx.cardSerialNumber,
      'Plate Code': tx.plateCode || '-',
      'In': new Date(tx.inTime).toLocaleString(),
      'Out': new Date(tx.outTime).toLocaleString(),
      'Free Hours': tx.freeHoursUsed,
      'Paid Hours': tx.paidHours,
      'Notes': tx.notes || '-'
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Transactions': worksheet }, SheetNames: ['Transactions'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    FileSaver.saveAs(blob, `Subscriber_Transactions_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

 print(): void {
  const content = document.getElementById('print-area');
  if (!content) return;

  const printWindow = window.open('', '_blank', 'width=900,height=650');
  if (!printWindow) return;

  const dir = this.isRtl() ? 'rtl' : 'ltr';

  printWindow.document.write(`
    <html dir="${dir}">
      <head>
        <title>Subscriber Report</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            margin: 40px;
            color: #222;
            font-size: 14px;
            direction: ${dir};
          }

          .center {
            text-align: center;
            margin-bottom: 16px;
          }

          .logo {
            height: 60px;
            margin-bottom: 8px;
          }

          .info, .stats {
            margin-bottom: 20px;
          }

          .info strong,
          .stats strong {
            display: inline-block;
            width: 160px;
          }

          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 10px;
            text-align: center;
            border-bottom: 1px solid #888;
            padding-bottom: 5px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
          }

          th, td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: center;
          }

          th {
            background-color: #f0f0f0;
          }

          .highlight {
            color: red;
            font-weight: bold;
          }

        </style>
      </head>
      <body>
        <div class="center">
          ${this.companyInfo?.logoUrl ? `<img class="logo" src="${this.companyInfo.logoUrl}" />` : ''}
          <h2>${this.companyInfo?.nameEn || ''}</h2>
          <h4>${this.companyInfo?.nameAr || ''}</h4>
          <p>${this.companyInfo?.address || ''}</p>
          <p><strong>📞</strong> ${this.companyInfo?.phone || ''}</p>
        </div>

        <div class="section-title">${this.translate.instant('individualSubscriber.printTitle')}</div>

        <div class="info">
          <p><strong>${this.translate.instant('individualSubscriber.name')}:</strong> ${this.selectedSubscriber?.name}</p>
          <p><strong>${this.translate.instant('individualSubscriber.cardId')}:</strong> ${this.selectedSubscriber?.cardSerialNumber}</p>
          <p><strong>${this.translate.instant('individualSubscriber.flatNo')}:</strong> ${this.selectedSubscriber?.flatNumber || '-'}</p>
          <p><strong>${this.translate.instant('individualSubscriber.status')}:</strong> ${this.selectedSubscriber?.status}</p>
          <p><strong>${this.translate.instant('individualSubscriber.extraHourFee')}:</strong> ${this.selectedSubscriber?.extraHourFee} SR</p>
        </div>

        <div class="stats">
          <p><strong>${this.translate.instant('individualSubscriber.totalHours')}:</strong> ${this.selectedSubscriber?.allowedHours}</p>
          <p><strong>${this.translate.instant('individualSubscriber.hoursUsed')}:</strong> ${this.selectedSubscriber?.usedHours}</p>
          <p><strong>${this.translate.instant('individualSubscriber.hoursRemaining')}:</strong> ${this.selectedSubscriber?.remainingHours}</p>
          <p><strong>${this.translate.instant('individualSubscriber.extraHours')}:</strong> ${this.selectedSubscriber?.extraHours}</p>
          <p><strong>${this.translate.instant('individualSubscriber.totalToPay')}:</strong> ${this.selectedSubscriber?.toPay} SR</p>
        </div>

        <div class="section-title">${this.translate.instant('individualSubscriber.transactions')}</div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>${this.translate.instant('individualSubscriber.table.in')}</th>
              <th>${this.translate.instant('individualSubscriber.table.out')}</th>
              <th>${this.translate.instant('individualSubscriber.table.usedHours')}</th>
              <th>${this.translate.instant('individualSubscriber.table.notes')}</th>
            </tr>
          </thead>
          <tbody>
            ${
              this.selectedSubscriber.transactions.map((tx: any, i: number) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${new Date(tx.inTime).toLocaleString()}</td>
                  <td>${new Date(tx.outTime).toLocaleString()}</td>
                  <td>${tx.freeHoursUsed}</td>
                  <td>${this.getNoteTranslation(tx.notes)}</td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}


  get stats() {
    return [
      { label: 'Allowed Hours', value: this.selectedSubscriber?.allowedHours || 0 },
      { label: 'Used Hours', value: this.selectedSubscriber?.usedHours || 0 },
      { label: 'Remaining Hours', value: this.selectedSubscriber?.remainingHours || 0 },
      { label: 'Extra Hours', value: this.selectedSubscriber?.extraHours || 0 },
      { label: 'Extra Hour Price', value: this.selectedSubscriber?.extraHourFee || 0 },
      { label: 'To Pay', value: this.selectedSubscriber?.toPay || 0 }
    ];
  }

  get breakdown() {
    const allowed = this.selectedSubscriber?.allowedHours || 0;
    const used = this.selectedSubscriber?.usedHours || 0;
    const extra = used > allowed ? used - allowed : 0;
    const extraPrice = this.selectedSubscriber?.extraHourFee || 0;

    return {
      allowed,
      used,
      remaining: allowed - used,
      extra,
      extraPrice,
      toPay: extra * extraPrice
    };
  }

  isRtl(): boolean {
    return document.dir === 'rtl';
  }

loadSubscriberOverview(id: number): void {
  this.isLoading = true;
  console.log('Loading subscriber ID:', id); // ✅ DEBUG
  this.subscribersService.getOverviewById(id).subscribe(overview => {
    console.log('Loaded overview:', overview); // ✅ DEBUG
    this.selectedSubscriber = overview;
    this.isLoading = false;
  });
}

getNoteTranslation(note: string): string {
  const match = note?.match(/^PERMANENT_PERIOD_NOTE:(\d+)$/);
  if (match) {
    const minutes = match[1];
    return this.translate.instant('individualSubscriber.permanentPeriodNote', { minutes });
  }
  return note || '-';
}

}
