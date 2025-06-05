import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscriber } from './subscriber.model';
import { SubscribersService } from './subscriber.service';
import { GeneralStatusService } from '../settings/general-statuses/general-statuses.service';
import { PlansService } from '../settings/plans/plans.service';
import { SubscriberTypeService } from '../settings/subscriber-types/subscriber-types.service';
import { CustomFormModalComponent } from '../../shared/components/custom-form-modal/custom-form-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
})
export class SubscribersComponent implements OnInit {
  subscribers: Subscriber[] = [];
  plans: any[] = [];
  subscriberTypes: any[] = [];
  statuses: any[] = [];

  viewMode: 'table' | 'grid' = 'table';
  searchText = '';

  constructor(
    private subscribersService: SubscribersService,
    private plansService: PlansService,
    private subscriberTypesService: SubscriberTypeService,
    private statusesService: GeneralStatusService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  // ✅ Load all dropdowns and table data
  loadAll(): void {
    this.subscribersService.getAll().subscribe(data => this.subscribers = data);
    this.plansService.getAll().subscribe(data => this.plans = data);
    this.subscriberTypesService.getAll().subscribe(data => this.subscriberTypes = data);
    this.statusesService.getAll().subscribe(data => this.statuses = data);
  }

  // ✅ Table columns
  get columns() {
    return [
      { columnDef: 'subscriberNameEn', header: 'Name (EN)', cell: (row: any) => `${row.subscriberNameEn}` },
      { columnDef: 'subscriberNameAr', header: 'Name (AR)', cell: (row: any) => `${row.subscriberNameAr}` },
      { columnDef: 'planId', header: 'Plan', cell: (row: any) => `${row.planId}` },
      { columnDef: 'subscriberType', header: 'Type', cell: (row: any) => `${row.subscriberType}` },
      { columnDef: 'status', header: 'Status', cell: (row: any) => `${row.status}` }
    ];
  }

  // ✅ Add button
  onAdd(): void {
  this.loadAllAndThenOpenForm();
}


  // ✅ Edit button
  onEdit(subscriber: Subscriber): void {
    this.openDialog(subscriber);
  }
loadAllAndThenOpenForm(): void {
  this.plansService.getAll().subscribe(plans => {
    this.plans = plans ?? [];

    this.subscriberTypesService.getAll().subscribe(types => {
      this.subscriberTypes = types ?? [];

      this.statusesService.getAll().subscribe(statuses => {
        this.statuses = statuses ?? [];

        // 🔁 Open the form ONLY when all dropdowns are loaded
        this.openDialog(null);
      });
    });
  });
}

  // ✅ Shared dialog for Add/Edit
  openDialog(subscriber: Subscriber | null): void {
  const isEdit = !!subscriber;

  const form = this.fb.group({
    id: [subscriber?.id ?? null],
    subscriberNameEn: [subscriber?.subscriberNameEn ?? '', Validators.required],
    subscriberNameAr: [subscriber?.subscriberNameAr ?? '', Validators.required],
    planId: [subscriber?.planId ?? null, Validators.required],
    subscriberType: [subscriber?.subscriberType ?? null, Validators.required],
    status: [subscriber?.status ?? null, Validators.required],
    phoneNo: [subscriber?.phoneNo ?? ''],
    nationalID: [subscriber?.nationalID ?? ''],
    email: [subscriber?.email ?? ''],
    resNo: [subscriber?.resNo ?? ''],
    issueDate: [subscriber?.issueDate ? formatDate(subscriber.issueDate) : null],
  });

  const planOptions = (this.plans ?? []).map(p => ({
    label: `${p.planNameAr ?? '-'} - ${p.planNameEn ?? '-'}`,
    value: p.id
  }));

  const typeOptions = (this.subscriberTypes ?? []).map(t => ({
    label: `${t.nameAr ?? '-'} - ${t.nameEn ?? '-'}`,
    value: t.id
  }));

  const statusOptions = (this.statuses ?? []).map(s => ({
    label: `${s.statusNameAr ?? '-'} - ${s.statusNameEn ?? '-'}`,
    value: s.id
  }));

  const fields: any[] = [
    { label: 'subscribers.subscriberNameEn', controlName: 'subscriberNameEn', direction: 'ltr' },
    { label: 'subscribers.subscriberNameAr', controlName: 'subscriberNameAr', direction: 'rtl' },
    {
      label: 'subscribers.planId',
      controlName: 'planId',
      type: 'select',
      filteredOptions: planOptions ?? [],
      searchControl: new FormControl('')
    },
    {
      label: 'subscribers.subscriberType',
      controlName: 'subscriberType',
      type: 'select',
      filteredOptions: typeOptions ?? [],
      searchControl: new FormControl('')
    },
    {
      label: 'subscribers.status',
      controlName: 'status',
      type: 'select',
      filteredOptions: statusOptions ?? [],
      searchControl: new FormControl('')
    },
    { label: 'subscribers.phoneNo', controlName: 'phoneNo', type: 'text' },
    { label: 'subscribers.nationalID', controlName: 'nationalID', type: 'text' },
    { label: 'subscribers.email', controlName: 'email', type: 'text' },
    { label: 'subscribers.resNo', controlName: 'resNo', type: 'text' },
    { label: 'subscribers.issueDate', controlName: 'issueDate', type: 'date' }
  ];

  const dialogRef = this.dialog.open(CustomFormModalComponent, {
    width: '95vw',
    maxWidth: '100vw',
    panelClass: 'full-width-modal',
    data: {
      title: isEdit ? 'subscribers.editTitle' : 'subscribers.addTitle',
      formGroup: form,
      fields,
      submitLabel: isEdit ? 'buttons.save' : 'buttons.add',
      cancelLabel: 'buttons.cancel'
    }
  });

dialogRef.afterClosed().subscribe(result => {
  if (!result) return;

  // ✅ Convert FormGroup to plain JS object
  const payload: any = form.getRawValue();

  // ✅ Strip out null/empty fields (especially undefined optional fields)
  Object.keys(payload).forEach(key => {
    if (payload[key] === null || payload[key] === '') {
      delete payload[key];
    }
  });

  // ✅ Safety check for id before PUT
  const save$ = isEdit && payload.id
    ? this.subscribersService.update(payload.id, payload)
    : this.subscribersService.create(payload);

  save$.subscribe(() => this.loadAll());
});

}


private cleanPayload(obj: any): any {
  const cleaned: any = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    cleaned[key] = value === null ? undefined : value;
  });
  return cleaned;
}


  // ✅ Delete
  onDelete(subscriber: Subscriber): void {
    if (confirm(`Delete subscriber "${subscriber.subscriberNameEn}"?`)) {
      this.subscribersService.delete(subscriber.id).subscribe(() => this.loadAll());
    }
  }
getPlanName(id: number): string {
  const plan = this.plans.find(p => p.id === id);
  return plan ? `${plan.planNameAr ?? '-'} - ${plan.planNameEn ?? '-'}` : '-';
}

getSubscriberTypeName(id: number): string {
  const type = this.subscriberTypes.find(t => t.id === id);
  return type ? `${type.nameAr ?? '-'} - ${type.nameEn ?? '-'}` : '-';
}

getStatusName(id: number): string {
  const status = this.statuses.find(s => s.id === id);
  return status ? `${status.statusNameAr ?? '-'} - ${status.statusNameEn ?? '-'}` : '-';
}

onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  this.http.post(`${environment.apiBaseUrl}/Subscribers/upload-excel`, formData).subscribe({
    next: () => {
      alert('✅ Upload successful');
      this.loadAll();
    },
    error: (err) => {
      console.error('Upload failed:', err);
      alert('❌ Upload failed');
    }
  });
}


}
