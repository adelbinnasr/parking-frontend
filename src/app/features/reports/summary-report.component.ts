import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { SubscribersService } from '../subscribers/subscriber.service';

@Component({
  selector: 'app-summary-report',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './summary-report.component.html',
})
export class SummaryReportComponent implements OnInit {
  summary: any[] = [];
  isLoading = true;

  constructor(private service: SubscribersService) {}

  ngOnInit(): void {
    this.service.getSummary().subscribe(data => {
      this.summary = data;
      this.isLoading = false;
    });
  }

  getTotal(key: keyof any): number {
    return this.summary.reduce((acc, curr) => acc + (Number(curr[key]) || 0), 0);
  }
}
