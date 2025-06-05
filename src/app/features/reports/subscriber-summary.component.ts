import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SubscribersService } from '../subscribers/subscriber.service';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-subscriber-summary',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule
  ],
  templateUrl: './subscriber-summary.component.html',
  styleUrls: ['./subscriber-summary.component.scss']
})
export class SubscriberSummaryComponent implements OnInit {
  summary: any[] = [];
  isLoading = true;

  displayedColumns: string[] = ['name', 'card', 'plan', 'allowed', 'used', 'extra', 'fee', 'pay'];

  searchText: string = '';
  selectedPlan: string = 'All';
  showUsedOnly = false;

  plans: { label: string; value: string }[] = [];

  constructor(
    private service: SubscribersService,
    public translate: TranslateService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchSummary();
  }

  fetchSummary(): void {
    this.isLoading = true;
    this.service.getSummary().subscribe(data => {
      this.summary = data;
      this.isLoading = false;

      const planMap = new Map<string, number>();

      data.forEach(item => {
        const key = this.getPlanName(item) || 'Unknown';
        planMap.set(key, (planMap.get(key) || 0) + 1);
      });

      this.plans = [
        { label: `All (${data.length})`, value: 'All' },
        ...Array.from(planMap.entries()).map(([name, count]) => ({
          label: `${name} (${count})`,
          value: name
        }))
      ];
    });
  }

  get filteredSummary() {
    const searchText = this.searchText.toLowerCase().trim();

    return this.summary.filter(sub => {
      const plan = this.getPlanName(sub);
      const matchesPlan = this.selectedPlan === 'All' || plan === this.selectedPlan;
      const matchesUsage = !this.showUsedOnly || sub.usedHours > 0;
      const matchesSearch =
        !searchText ||
        sub.name?.toLowerCase().includes(searchText) ||
        sub.cardNumber?.toString().includes(searchText) ||
        plan?.toLowerCase().includes(searchText);

      return matchesPlan && matchesUsage && matchesSearch;
    });
  }

  getTotal(key: keyof any): number {
    return this.filteredSummary.reduce((acc, curr) => acc + (Number(curr[key]) || 0), 0);
  }

  exportToExcel(): void {
    const data = this.filteredSummary.map(row => ({
      Name: row.name,
      CardNumber: row.cardNumber,
      Plan: this.getPlanName(row),
      AllowedHours: row.allowedHours,
      UsedHours: row.usedHours,
      ExtraHours: row.extraHours,
      HourFee: row.hourFee,
      ToPay: row.toPay
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    XLSX.writeFile(wb, 'SubscriberSummary.xlsx');
  }

  print(): void {
    window.print();
  }

  hasToPay(row: any): boolean {
    return Number(row.toPay) > 0;
  }

  getPlanName(row: any): string {
    return this.translate.currentLang === 'ar'
      ? row.planNameAr || 'غير معروف'
      : row.planName || 'Unknown';
  }

  get filteredCount(): number {
    return this.filteredSummary.length;
  }

  goToIndividualReport(subscriberId: number): void {
  this.router.navigate(['/reports/subscriber'], {
    queryParams: { id: subscriberId }
  });
}

}
