// import { Component, inject, Inject } from '@angular/core';
// import { FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatError } from '@angular/material/form-field';
// import { CommonModule, DOCUMENT } from '@angular/common';
// import { TranslateModule } from '@ngx-translate/core';
// import { MatSelectModule } from '@angular/material/select';
// import { MatCheckboxModule } from '@angular/material/checkbox';


// export interface CustomField {
//   label: string;
//   controlName: string;
//   type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox';
//   direction?: 'ltr' | 'rtl';
//   icon?: string;
//   maxLength?: number;
//   rows?: number;
//   hint?: string;
//   options?: { value: any; label: string }[];
//   placeholder?: string;
//   autofocus?: boolean;
// }



// @Component({
//   selector: 'app-custom-form-modal',
//   standalone: true,
//   templateUrl: './custom-form-modal.component.html',
//   styleUrls: ['./custom-form-modal.component.scss'],
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     TranslateModule,
//     MatSelectModule,
//     MatCheckboxModule
//   ]
// })
// export class CustomFormModalComponent {
//   document = inject(DOCUMENT);
//   constructor(
//     public dialogRef: MatDialogRef<CustomFormModalComponent>,

//     @Inject(MAT_DIALOG_DATA)
//     public data: {
//       title: string;
//       formGroup: FormGroup;
//       fields: CustomField[];
//       submitLabel?: string;
//       cancelLabel?: string;
//     }

//   ) {}



//   close() {
//     this.dialogRef.close();
//   }

//   submit() {
//     if (this.data.formGroup.valid) {
//       this.dialogRef.close(this.data.formGroup.value);
//     }
//   }

//   isRtl(): boolean {
//     return document.dir === 'rtl';
//   }


// }


import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';



export interface CustomField {
  label: string;
  controlName: string;
  type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date' | 'time';
  direction?: 'ltr' | 'rtl';
  icon?: string;
  maxLength?: number;
  rows?: number;
  hint?: string;
  options?: { value: any; label: string }[];
  placeholder?: string;
  autofocus?: boolean;
  fullWidth?: boolean;

  // Additions for filtering
  searchControl?: FormControl;
  filteredOptions?: { value: any; label: string }[];
}

@Component({
  selector: 'app-custom-form-modal',
  standalone: true,
  templateUrl: './custom-form-modal.component.html',
  styleUrls: ['./custom-form-modal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    FlatpickrDirective
  ],
  providers: [
    provideFlatpickrDefaults({
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'F j, Y',
    }),
  ],
})
export class CustomFormModalComponent implements OnInit {
  document = inject(DOCUMENT);
  private destroy$ = new Subject<void>();
  public datePickers: { [key: string]: MatDatepicker<any> } = {};
  pickerRefs: { [key: string]: string } = {
    startDate: 'startDatePicker',
    endDate: 'endDatePicker'
  };


  constructor(
    public dialogRef: MatDialogRef<CustomFormModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      formGroup: FormGroup;
      fields: CustomField[];
      submitLabel?: string;
      cancelLabel?: string;
    }
  ) {}

  ngOnInit(): void {
    this.setupSearchableDropdowns();
  }

  setupSearchableDropdowns(): void {
    this.data.fields.forEach(field => {
      if (field.type === 'select' && field.options) {
        field.searchControl = new FormControl('');
        field.filteredOptions = [...field.options];

        field.searchControl.valueChanges
          .pipe(
            takeUntil(this.destroy$),
            startWith(''),
            map(value => {
              const search = (value || '').toLowerCase();
              field.filteredOptions = field.options!.filter(option =>
                option.label.toLowerCase().includes(search)
              );
            })
          )
          .subscribe();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.data.formGroup.valid) {
      this.dialogRef.close(this.data.formGroup.value);
    }
  }

  isRtl(): boolean {
    return this.document.dir === 'rtl';
  }

  public hasDateFields(): boolean {
    return this.data?.fields?.some(f => f.controlName === 'startDate') &&
           this.data?.fields?.some(f => f.controlName === 'endDate');
  }

}
