import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip'; // Optional
import { MatSortModule } from '@angular/material/sort'; // Optional
import { MatPaginatorModule } from '@angular/material/paginator'; // Optional
import { TranslateModule } from '@ngx-translate/core';

import { BuildingsComponent } from './buildings.component';
import { BuildingsRoutingModule } from './buildings-routing.module';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BuildingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuildingsRoutingModule,
    TranslateModule,
    CustomFormModalComponent,

    // Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule
  ]
})
export class BuildingsModule {}
