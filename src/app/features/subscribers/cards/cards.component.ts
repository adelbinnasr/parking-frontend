// src/app/features/subscribers/cards/cards.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CardService } from './card.service';
import { SubscribersService } from '../subscriber.service';
import { GeneralStatusService } from '../../settings/general-statuses/general-statuses.service';

import { Card } from './card.model';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  subscribers: any[] = [];
  statuses: any[] = [];

  viewMode: 'table' | 'grid' = 'table';
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cardService: CardService,
    private subscriberService: SubscribersService,
    private statusService: GeneralStatusService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  // ✅ Load all required data
  loadAll(): void {
    this.cardService.getAll().subscribe(data => (this.cards = data));
    this.subscriberService.getAll().subscribe(data => (this.subscribers = data));
    this.statusService.getAll().subscribe(data => (this.statuses = data));
  }

  // ✅ Dynamically defined columns for table
  get columns() {
    return [
      {
        columnDef: 'cardSerialNumber',
        header: 'Serial',
        cell: (row: Card) => `${row.cardSerialNumber}`
      },
      {
        columnDef: 'subscriberId',
        header: 'Subscriber',
        cell: (row: Card) => this.getSubscriberFullName(row.subscriberId)
      },
      {
        columnDef: 'status',
        header: 'Status',
        cell: (row: Card) => `${row.status}`
      }
    ];
  }

  // ✅ Get full name for table/grid use
  getSubscriberFullName(id: number): string {
    const s = this.subscribers.find(sub => sub.id === id);
    return s ? `${s.subscriberNameAr ?? '-'}` + ' - ' + `${s.subscriberNameEn ?? '-'}` : '-';
  }

  // ✅ Add new card
  onAdd(): void {
    this.openFormModal(null);
  }

  // ✅ Edit existing card
  onEdit(card: Card): void {
    this.openFormModal(card);
  }

  // ✅ Unified form modal for both Add & Edit
  openFormModal(card: Card | null): void {
    const isEdit = !!card;

    const form = this.fb.group({
      id: [card?.id ?? null],
      cardSerialNumber: [card?.cardSerialNumber ?? '', Validators.required],
      subscriberId: [card?.subscriberId ?? null, Validators.required],
      status: [card?.status ?? null, Validators.required]
    });

    const subscriberOptions = this.subscribers.map(s => ({
      label: `${s.subscriberNameAr ?? '-'} - ${s.subscriberNameEn ?? '-'}`,
      value: s.id
    }));

    const statusOptions = this.statuses.map(s => ({
      label: `${s.statusNameAr} - ${s.statusNameEn}`,
      value: s.id
    }));

    const fields = [
      {
        label: 'cards.cardSerialNumber',
        controlName: 'cardSerialNumber',
        direction: 'ltr'
      },
      {
        label: 'cards.subscriberId',
        controlName: 'subscriberId',
        type: 'select',
        filteredOptions: subscriberOptions,
        searchControl: new FormControl('')
      },
      {
        label: 'cards.status',
        controlName: 'status',
        type: 'select',
        filteredOptions: statusOptions,
        searchControl: new FormControl('')
      }
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: isEdit ? 'cards.editTitle' : 'cards.addTitle',
        formGroup: form,
        fields,
        submitLabel: isEdit ? 'buttons.save' : 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

 dialogRef.afterClosed().subscribe(result => {
  if (!result) return;

  if (!isEdit) {
    const confirmed = confirm(
      '⚠️ Card Serial Number cannot be updated after saving.\n\nDo you want to proceed?'
    );
    if (!confirmed) return;
  }

  const save$ = isEdit && card
    ? this.cardService.update(card.id, result)
    : this.cardService.create(result);

  save$.subscribe(() => this.loadAll());
});

  }

  // ✅ Delete card
  onDelete(card: Card): void {
    if (confirm(`Delete card "${card.cardSerialNumber}"?`)) {
      this.cardService.delete(card.id).subscribe(() => this.loadAll());
    }
  }
}
