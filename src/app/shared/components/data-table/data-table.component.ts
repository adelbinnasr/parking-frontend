import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() columns: {
    columnDef: string;
    header: string;
    cell: (row: any) => string;
  }[] = [];

  @Input() dataSource: any[] = [];
  @Input() actions: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  getDisplayedColumns(): string[] {
    const base = this.columns.map(c => c.columnDef);
    return this.actions ? [...base, 'actions'] : base;
  }
}
