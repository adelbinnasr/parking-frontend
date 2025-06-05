import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FlatpickrDirective } from 'angularx-flatpickr';

import { CustomField } from '../custom-form-modal/custom-form-modal.component'; // reuse same interface

@Component({
  selector: 'app-custom-form-drawer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    TranslateModule,
    FlatpickrDirective
  ],
  templateUrl: './custom-form-drawer.component.html',
  styleUrls: ['./custom-form-drawer.component.scss']
})
export class CustomFormDrawerComponent {
  @Input() title = '';
  @Input() formGroup!: FormGroup;
  @Input() fields: CustomField[] = [];
  @Input() submitLabel = 'buttons.save';
  @Input() cancelLabel = 'buttons.cancel';

  @Output() submitForm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  document = inject(DOCUMENT);

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitForm.emit(this.formGroup.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  isRtl(): boolean {
    return this.document.dir === 'rtl';
  }
}
