// src/app/shared/shared-components.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

// Non-standalone component (must be declared)
import { DataTableComponent } from './components/data-table/data-table.component';

// Standalone components (must be imported, not declared)
import { CustomFormModalComponent } from './components/custom-form-modal/custom-form-modal.component';
import { CustomFormDrawerComponent } from './components/custom-form-drawer/custom-form-drawer.component';

@NgModule({
  declarations: [
    DataTableComponent // ✅ Declared only here
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,

    // ✅ Standalone imports
    CustomFormModalComponent,
    CustomFormDrawerComponent
  ],
  exports: [
    DataTableComponent,
    CustomFormModalComponent,
    CustomFormDrawerComponent
  ]
})
export class SharedComponentsModule {}
