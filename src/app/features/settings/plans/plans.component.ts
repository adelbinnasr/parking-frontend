import { Component, OnInit } from '@angular/core';
import { PlansService } from './plans.service';
import { Plan } from './plans.model';
import { TariffsService } from '../tariffs/tariffs.service';
import { GeneralStatusService } from '../general-statuses/general-statuses.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];
  tariffs: any[] = [];
  statuses: any[] = [];
  selectedPlan: Plan | null = null;
  viewMode: 'table' | 'grid' = 'table';
  searchText = '';
  statusFilter: number | null = null;

  columns = [
    { columnDef: 'planNameEn', header: 'Plan Name (EN)', cell: (row: any) => `${row.planNameEn}` },
    { columnDef: 'planNameAr', header: 'Plan Name (AR)', cell: (row: any) => `${row.planNameAr}` },
    { columnDef: 'hoursIncluded', header: 'Max Hours', cell: (row: any) => `${row.hoursIncluded}` },
    { columnDef: 'price', header: 'Price', cell: (row: any) => `${row.price}` },
    { columnDef: 'salePrice', header: 'Sale Price', cell: (row: any) => `${row.salePrice ?? '-'}` },
    { columnDef: 'status', header: 'Status', cell: (row: any) => `${row.status}` }
  ];

  constructor(
    private plansService: PlansService,
    private tariffsService: TariffsService,
    private statusesService: GeneralStatusService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.plansService.getAll().subscribe((data: Plan[]) => {
      this.plans = data;
    });

    this.tariffsService.getAllTariffs().subscribe((data: any[]) => {
      this.tariffs = data;
    });

    this.statusesService.getAll().subscribe((data: any[]) => {
      this.statuses = data;
    });
  }

  onAdd() {
    const form = this.fb.group({
      planNameEn: ['', Validators.required],
      planNameAr: ['', Validators.required],
      hoursIncluded: [0, Validators.required],
      price: [0, Validators.required],
      salePrice: [0],
      tariffAfterFree: [null],
      status: [null, Validators.required],
    });

    const tariffOptions = this.tariffs.map(t => ({
      label: `${t.tariffNameAr} - ${t.tariffNameEn}`,
      value: t.id
    }));

    const statusOptions = this.statuses.map(s => ({
      label: `${s.statusNameAr} - ${s.statusNameEn}`,
      value: s.id
    }));

    const fields = [
      { label: 'plans.planNameEn', controlName: 'planNameEn', direction: 'ltr' },
      { label: 'plans.planNameAr', controlName: 'planNameAr', direction: 'rtl' },
      { label: 'plans.hoursIncluded', controlName: 'hoursIncluded', type: 'number', direction: 'ltr' },
      { label: 'plans.price', controlName: 'price', type: 'number', direction: 'ltr' },
      { label: 'plans.salePrice', controlName: 'salePrice', type: 'number', direction: 'ltr' },
      {
        label: 'plans.tariffAfterFree',
        controlName: 'tariffAfterFree',
        type: 'select',
        filteredOptions: tariffOptions,
        searchControl: new FormControl('')
      },
      {
        label: 'plans.status',
        controlName: 'status',
        type: 'select',
        filteredOptions: statusOptions,
        searchControl: new FormControl('')
      }
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '95vw',
      maxWidth: '100vw',
      height: 'auto',
      panelClass: 'full-width-modal',
      data: {
        title: 'plans.addTitle',
        formGroup: form,
        fields,
        submitLabel: 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result); // ✅ Debug

      if (result) {
        this.plansService.create(result).subscribe(() => this.loadAll());
      }
    });
  }

  onEdit(plan: Plan | null) {
    const isEdit = !!plan;

    const form = this.fb.group({
      id: [plan?.id ?? null],
      planNameEn: [plan?.planNameEn ?? '', Validators.required],
      planNameAr: [plan?.planNameAr ?? '', Validators.required],
      hoursIncluded: [plan?.hoursIncluded ?? 0, Validators.required],
      price: [plan?.price ?? 0, Validators.required],
      salePrice: [plan?.salePrice ?? 0],
      tariffAfterFree: [plan?.tariffAfterFree ?? null],
      status: [Number(plan?.status ?? 0), Validators.required],
    });

    const tariffOptions = this.tariffs.map(t => ({
      label: `${t.tariffNameAr} - ${t.tariffNameEn}`,
      value: t.id
    }));

    const statusOptions = this.statuses.map(s => ({
      label: `${s.statusNameAr} - ${s.statusNameEn}`,
      value: s.id
    }));

    const fields = [
      { label: 'plans.planNameEn', controlName: 'planNameEn', direction: 'ltr' },
      { label: 'plans.planNameAr', controlName: 'planNameAr', direction: 'rtl' },
      { label: 'plans.hoursIncluded', controlName: 'hoursIncluded', type: 'number', direction: 'ltr' },
      { label: 'plans.price', controlName: 'price', type: 'number', direction: 'ltr' },
      { label: 'plans.salePrice', controlName: 'salePrice', type: 'number', direction: 'ltr' },
      {
        label: 'plans.tariffAfterFree',
        controlName: 'tariffAfterFree',
        type: 'select',
        filteredOptions: tariffOptions,
        searchControl: new FormControl('')
      },
      {
        label: 'plans.status',
        controlName: 'status',
        type: 'select',
        filteredOptions: statusOptions,
        searchControl: new FormControl('')
      }
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: isEdit ? 'plans.editTitle' : 'plans.addTitle',
        formGroup: form,
        fields,
        submitLabel: isEdit ? 'buttons.save' : 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit && plan) {
          this.plansService.update(plan.id, result).subscribe(() => this.loadAll());
        } else {
          this.plansService.create(result).subscribe(() => this.loadAll());
        }
      }
    });
  }


  onDelete(plan: Plan) {
    if (confirm(`Delete plan "${plan.planNameEn}"?`)) {
      this.plansService.delete(plan.id).subscribe(() => this.loadAll());
    }
  }

  onFormSubmit(formData: any) {
    if (this.selectedPlan) {
      this.plansService.update(this.selectedPlan.id, formData).subscribe(() => {
        this.selectedPlan = null;
        this.loadAll();
      });
    } else {
      this.plansService.create(formData).subscribe(() => this.loadAll());
    }
  }


}
