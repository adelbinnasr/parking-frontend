import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriberTypeService } from './subscriber-types.service';
import { SubscriberType } from './subscriber-types.model';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralStatusService } from '../general-statuses/general-statuses.service';

@Component({
  selector: 'app-subscriber-types',
  templateUrl: './subscriber-types.component.html',
  styleUrls: ['./subscriber-types.component.scss'],
})
export class SubscriberTypesComponent implements OnInit {
  subscriberTypes: SubscriberType[] = [];
  searchText = '';
  viewMode: 'table' | 'grid' = 'table';
  statuses: any[] = [];


columns = [
  {
    columnDef: 'nameEn',
    header: 'Name (EN)',
    cell: (row: any) => `${row.nameEn}`
  },
  {
    columnDef: 'nameAr',
    header: 'Name (AR)',
    cell: (row: any) => `${row.nameAr}`
  },
  {
    columnDef: 'status',
    header: 'Status',
    cell: (row: any) => `${row.status}`
  }
];

  constructor(private service: SubscriberTypeService, private dialog: MatDialog,  private statusesService: GeneralStatusService ,    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.service.getAll().subscribe((data: SubscriberType[]) => {
      this.subscriberTypes = data;
    });

    this.statusesService.getAll().subscribe((data: any[]) => {
      this.statuses = data;
    });
  }

  onAdd() {
    const form = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      status: [null, Validators.required],
    });

    const statusOptions = this.statuses.map(s => ({
      label: `${s.statusNameAr} - ${s.statusNameEn}`,
      value: s.id
    }));

    const fields = [
      { label: 'subscriberTypes.nameEn', controlName: 'nameEn', direction: 'ltr' },
      { label: 'subscriberTypes.nameAr', controlName: 'nameAr', direction: 'rtl' },
      {
        label: 'subscriberTypes.status',
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
        title: 'subscriberTypes.addTitle',
        formGroup: form,
        fields,
        submitLabel: 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.create(result).subscribe(() => this.loadAll());
      }
    });
  }



  onEdit(type: SubscriberType | null) {
    const isEdit = !!type;

    const form = this.fb.group({
      id: [type?.id ?? null],
      nameEn: [type?.nameEn ?? '', Validators.required],
      nameAr: [type?.nameAr ?? '', Validators.required],
      status: [Number(type?.status ?? 0), Validators.required],
    });

    const statusOptions = this.statuses.map(s => ({
      label: `${s.statusNameAr} - ${s.statusNameEn}`,
      value: s.id
    }));

    const fields = [
      { label: 'subscriberTypes.nameEn', controlName: 'nameEn', direction: 'ltr' },
      { label: 'subscriberTypes.nameAr', controlName: 'nameAr', direction: 'rtl' },
      {
        label: 'subscriberTypes.status',
        controlName: 'status',
        type: 'select',
        filteredOptions: statusOptions,
        searchControl: new FormControl('')
      }
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: isEdit ? 'subscriberTypes.editTitle' : 'subscriberTypes.addTitle',
        formGroup: form,
        fields,
        submitLabel: isEdit ? 'buttons.save' : 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit && type) {
          this.service.update(type.id, result).subscribe(() => this.loadAll());
        } else {
          this.service.create(result).subscribe(() => this.loadAll());
        }
      }
    });
  }


  onDelete(item: SubscriberType) {
    if (confirm('Are you sure?')) {
      this.service.delete(item.id).subscribe(() => this.loadAll());
    }
  }

  getFields() {
    return [
      { controlName: 'nameEn', label: 'subscriberTypes.nameEn', type: 'text' },
      { controlName: 'nameAr', label: 'subscriberTypes.nameAr', type: 'text', direction: 'rtl' },
      { controlName: 'status', label: 'subscriberTypes.status', type: 'select', filteredOptions: [
        { label: 'Active | نشط', value: 1 },
        { label: 'Inactive | غير نشط', value: 0 }
      ]}
    ];
  }

  buildForm(item: SubscriberType | null) {
    return new FormGroup({
      nameEn: new FormControl(item?.nameEn || '', Validators.required),
      nameAr: new FormControl(item?.nameAr || '', Validators.required),
      status: new FormControl(item?.status ?? 1, Validators.required),
    });
  }
}
