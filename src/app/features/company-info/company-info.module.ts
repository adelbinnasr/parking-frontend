import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './company-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsModule } from '../../shared/shared-components.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: CompanyInfoComponent }];

@NgModule({
  declarations: [CompanyInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
 MatCardModule,
 MatDividerModule,
 MatCardModule,
 MatIconModule,
TranslateModule


  ]
})
export class CompanyInfoModule {}
