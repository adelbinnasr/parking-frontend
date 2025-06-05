// src/app/features/settings/settings.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslateModule } from '@ngx-translate/core';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';

// Shared
import { SharedComponentsModule } from '../../shared/shared-components.module';

// Feature components
import { FlatsComponent } from './flats/flats.component';
import { GeneralStatusesComponent } from './general-statuses/general-statuses.component';
import { SubscriberTypesComponent } from './subscriber-types/subscriber-types.component';
import { BuildingsComponent } from './Buildings/buildings.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import { PlansComponent } from './plans/plans.component';

@NgModule({
  declarations: [
    FlatsComponent,
    GeneralStatusesComponent,
    SubscriberTypesComponent,
    BuildingsComponent,
    TariffsComponent,
    PlansComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    TranslateModule,
    NgxMatSelectSearchModule,
    SharedComponentsModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSidenavModule
  ]
})
export class SettingsModule {}
