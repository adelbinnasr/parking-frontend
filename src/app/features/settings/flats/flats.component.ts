import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FlatsService } from './flats.service';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';
import { Flat } from './flats.model';
import { SubscribersService } from '../../subscribers/subscriber.service';

@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
})
export class FlatsComponent implements OnInit {
  flats: Flat[] = [];
  viewMode: 'grid' | 'table' = 'table';
  subscriberOptions: { value: number; label: string }[] = [];

  columns = [
    { columnDef: 'id', header: '#', cell: (row: any) => `${row.id}` },
    { columnDef: 'flatNumber', header: 'flats.flatNumber', cell: (row: any) => row.flatNumber },
    { columnDef: 'buildingId', header: 'flats.buildingId', cell: (row: any) => row.buildingId },
    { columnDef: 'subscriberId', header: 'flats.subscriberId', cell: (row: any) => row.subscriberId },
  ];

  constructor(
    private service: FlatsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private subscribersService: SubscribersService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadSubscribers();
  }

  load() {
    this.service.getAll().subscribe(data => (this.flats = data));
  }

  loadSubscribers() {
    this.subscribersService.getAll().subscribe((data: any[]) => {
      this.subscriberOptions = data.map(s => ({
        value: s.id,
        label: `${s.subscriberNameAr} – ${s.phoneNo}`
      }));
    });
  }


  onAdd() {
    if ( this.subscriberOptions.length === 0) {
      this.loadSubscribers();
    }

    const form = this.fb.group({
      flatNumber: ['', Validators.required],
      buildingId: [null, Validators.required],
      subscriberId: [null, Validators.required],
    });

    const fields = [
      { label: 'flats.flatNumber', controlName: 'flatNumber', direction: 'ltr' },
      { label: 'flats.buildingId', controlName: 'buildingId', direction: 'ltr' },
      {
        label: 'flats.subscriberId',
        controlName: 'subscriberId',
        direction: 'ltr',
        type: 'select',
        options: this.subscriberOptions
      }
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: 'flats.addTitle',
        formGroup: form,
        fields,
        submitLabel: 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.service.create(result).subscribe(() => this.load());
    });
  }

  onEdit(flat: Flat) {
    const form = this.fb.group({
      flatNumber: [flat.flatNumber, Validators.required],
      buildingId: [flat.buildingId, Validators.required],
      subscriberId: [flat.subscriberId, Validators.required],
    });

    const fields = [
      { label: 'flats.flatNumber', controlName: 'flatNumber', direction: 'ltr' },
      { label: 'flats.buildingId', controlName: 'buildingId', direction: 'ltr' },
      {
        label: 'flats.subscriberId',
        controlName: 'subscriberId',
        direction: 'ltr',
        type: 'select',
        options: this.subscriberOptions
      }
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: 'flats.editTitle',
        formGroup: form,
        fields,
        submitLabel: 'buttons.save',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.service.update(flat.id, result).subscribe(() => this.load());
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
