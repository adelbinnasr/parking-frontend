// src/app/features/subscribers/subscribers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';

import { CardsComponent } from './cards/cards.component';
import { SubscribersComponent } from './subscribers.component';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SharedComponentsModule } from '../../shared/shared-components.module';

@NgModule({
  declarations: [
    CardsComponent,
    SubscribersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubscribersRoutingModule,
    TranslateModule,
    SharedComponentsModule,

    // ✅ Add these required Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SubscribersModule {}
