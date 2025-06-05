import { Component, OnInit } from '@angular/core';
import { TariffsService } from './tariffs.service';
import { Tariff } from './tariffs.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';
import { GeneralStatusService } from '../general-statuses/general-statuses.service';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
})
export class TariffsComponent implements OnInit {
  tariffs: Tariff[] = [];
  generalStatuses: { id: number; statusNameEn: string; statusNameAr: string }[] = [];

  viewMode: 'table' | 'grid' = 'table';
  searchText = '';
  statusFilter: number | null = null;
  columns = [
    { columnDef: 'tariffNameEn', header: 'tariffs.tariffNameEn', cell: (row: any) => `${row.tariffNameEn}` },
    { columnDef: 'tariffNameAr', header: 'tariffs.tariffNameAr', cell: (row: any) => `${row.tariffNameAr}` },
    { columnDef: 'pricePerHour', header: 'tariffs.pricePerHour', cell: (row: any) => `${row.pricePerHour}` },
    {
      columnDef: 'startDate',
      header: 'tariffs.startDate',
      cell: (row: any) =>
        row.startDate ? new Date(row.startDate).toLocaleDateString('en-GB') : ''
    },
    {
      columnDef: 'endDate',
      header: 'tariffs.endDate',
      cell: (row: any) =>
        row.endDate ? new Date(row.endDate).toLocaleDateString('en-GB') : ''
    },
    { columnDef: 'status', header: 'tariffs.status', cell: (row: any) => `${row.status}` }
  ];

  constructor(
    private service: TariffsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private generalStatusService: GeneralStatusService
  ) {}



  ngOnInit(): void {
    this.load();
    this.generalStatusService.getAll().subscribe(data => {
      this.generalStatuses = data;
    });
  }

  load() {
    this.service.getAllTariffs({
      statusId: this.statusFilter ?? undefined,
      search: this.searchText || undefined
    }).subscribe(data => {
      this.tariffs = data;
    });
  }


  onAdd() {
    const form = this.fb.group({
      tariffNameEn: ['', Validators.required],
      tariffNameAr: ['', Validators.required],
      pricePerHour: [0, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [null, Validators.required],
    });

    const statuses = this.generalStatuses.map(s => ({
      label: `${s.statusNameAr} - ${s.statusNameEn}`,
      value: s.id
    }));

    const fields = [
      { label: 'tariffs.tariffNameEn', controlName: 'tariffNameEn', direction: 'ltr' },
      { label: 'tariffs.tariffNameAr', controlName: 'tariffNameAr', direction: 'rtl' },
      { label: 'tariffs.pricePerHour', controlName: 'pricePerHour', type: 'number', direction: 'ltr' },
      { label: 'tariffs.startDate', controlName: 'startDate', type: 'date', direction: 'ltr' },
      { label: 'tariffs.endDate', controlName: 'endDate', type: 'date', direction: 'ltr' },
      {
        label: 'tariffs.status',
        controlName: 'status',
        type: 'select',
        filteredOptions: statuses,
        searchControl: new FormControl('') // for ngx-mat-select-search
      }
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: 'tariffs.addTitle',
        formGroup: form,
        fields,
        submitLabel: 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.service.createTariff(result).subscribe(() => this.load());
    });
  }
//=============================================================

  onEdit(tariff: Tariff) {
    const options = this.generalStatuses.map(status => ({
      value: status.id,
      label: `${status.statusNameEn} | ${status.statusNameAr}`
    }));
    const form = this.fb.group({

      id: [tariff.id],
      tariffNameEn: [tariff.tariffNameEn, Validators.required],
      tariffNameAr: [tariff.tariffNameAr, Validators.required],
      pricePerHour: [tariff.pricePerHour, Validators.required],
      startDate: [new Date(tariff.startDate), Validators.required],
    endDate: [new Date(tariff.endDate), Validators.required],
    status: [Number(tariff.status), Validators.required],
    });

    const fields = [
      { label: 'tariffs.tariffNameEn', controlName: 'tariffNameEn', direction: 'ltr' },
      { label: 'tariffs.tariffNameAr', controlName: 'tariffNameAr', direction: 'rtl' },
      { label: 'tariffs.pricePerHour', controlName: 'pricePerHour', type: 'number', direction: 'ltr' },
      { label: 'tariffs.startDate', controlName: 'startDate', type: 'date', direction: 'ltr' },
      { label: 'tariffs.endDate', controlName: 'endDate', type: 'date', direction: 'ltr' },
      {
        label: 'tariffs.status',
        controlName: 'status',
        type: 'select',
        direction: 'ltr',
        searchControl: new FormControl(''),
        filteredOptions: options
      }
          ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: 'tariffs.editTitle',
        formGroup: form,
        fields,
        submitLabel: 'buttons.save',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.startDate = new Date(result.startDate).toISOString();
        result.endDate = new Date(result.endDate).toISOString();
        console.log('Final form result', result); // <- log it
        this.service.updateTariff(tariff.id, result).subscribe(() => this.load());
      }
    });


  }
//=============================================================

  onDelete(tariff: Tariff) {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteTariff(tariff.id).subscribe(() => this.load());
    }
  }

//=============================================================


}
