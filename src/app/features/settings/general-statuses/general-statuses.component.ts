import { Component, OnInit } from '@angular/core';
import { GeneralStatusService } from './general-statuses.service';
import { GeneralStatus } from './general-statuses.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-general-statuses',
  templateUrl: './general-statuses.component.html',
  styleUrls: ['./general-statuses.component.scss'],

})
export class GeneralStatusesComponent implements OnInit {
  statuses: GeneralStatus[] = [];
  viewMode: 'table' | 'grid' = 'table';

  columns = [
  {
    columnDef: 'id',
    header: '#',
    cell: (row: any) => `${row.id}`,
  },
  {
    columnDef: 'statusNameEn',
    header: 'generalStatuses.nameEn',
    cell: (row: any) => row.statusNameEn,
  },
  {
    columnDef: 'statusNameAr',
    header: 'generalStatuses.nameAr',
    cell: (row: any) => row.statusNameAr,
  }
];




  constructor(
    private statusService: GeneralStatusService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadStatuses();
  }

  loadStatuses() {
    this.statusService.getAll().subscribe(data => {
      this.statuses = data;
    });
  }

  onAdd() {
    const form: FormGroup = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required]
    });

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: 'status.addTitle',
        formGroup: form,
        fields: [
          { label: 'status.nameEn', controlName: 'nameEn', direction: 'ltr' },
          { label: 'status.nameAr', controlName: 'nameAr', direction: 'rtl' }
        ],
        submitLabel: 'buttons.add',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.statusService.create({
          statusNameEn: result.nameEn,
          statusNameAr: result.nameAr
        }).subscribe(() => this.loadStatuses());
      }
    });
  }

  onEdit(status: GeneralStatus) {
    const form: FormGroup = this.fb.group({
      nameEn: [status.statusNameEn, Validators.required],
      nameAr: [status.statusNameAr, Validators.required]
    });

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      width: '500px',
      data: {
        title: 'status.editTitle',
        formGroup: form,
        fields: [
          { label: 'status.nameEn', controlName: 'nameEn', direction: 'ltr' },
          { label: 'status.nameAr', controlName: 'nameAr', direction: 'rtl' }
        ],
        submitLabel: 'buttons.save',
        cancelLabel: 'buttons.cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.statusService.update(status.id, {
          id: status.id,
          statusNameEn: result.nameEn,
          statusNameAr: result.nameAr
        }).subscribe(() => this.loadStatuses());
      }
    });
  }

  onDelete(status: GeneralStatus) {
    if (confirm('Are you sure you want to delete this status?')) {
      this.statusService.delete(status.id).subscribe(() => {
        this.loadStatuses();
      });
    }
  }



}
