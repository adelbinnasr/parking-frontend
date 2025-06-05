// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { TranslateModule } from '@ngx-translate/core';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatTooltipModule } from '@angular/material/tooltip';

// import { BuildingsService } from './buildings.service';
// import { Building } from './buildings.model';
// import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';
// import { MatCardModule } from '@angular/material/card';

// @Component({
//   selector: 'app-buildings',
//   standalone: true,
//   templateUrl: './buildings.component.html',
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     TranslateModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     MatTableModule,
//     MatTooltipModule,
//     CustomFormModalComponent,
//     MatCardModule
//   ]
// })
// export class BuildingsComponent implements OnInit {
//   buildings: Building[] = [];
//   displayedColumns: string[] = ['id', 'nameEn', 'nameAr', 'locationEn', 'locationAr', 'actions'];
//   viewMode: 'grid' | 'table' = 'table';


//   isTableView: boolean = true;

//   setView(table: boolean) {
//     this.isTableView = table;
//   }


//   constructor(
//     private service: BuildingsService,
//     private fb: FormBuilder,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     this.fetch();
//   }

//   fetch() {
//     this.service.getAll().subscribe(data => (this.buildings = data));
//   }

//   openModal(mode: 'add' | 'edit', building?: Building) {
//     const formGroup = this.fb.group({
//       nameEn: [building?.nameEn || '', Validators.required],
//       nameAr: [building?.nameAr || '', Validators.required],
//       locationEn: [building?.locationEn || '', Validators.required],
//       locationAr: [building?.locationAr || '', Validators.required],
//     });

//     const fields = [
//       { label: 'buildings.nameEn', controlName: 'nameEn', direction: 'ltr', icon: 'location_city', placeholder: 'buildings.nameEn' },
//       { label: 'buildings.nameAr', controlName: 'nameAr', direction: 'rtl', icon: 'location_city', placeholder: 'buildings.nameAr' },
//       { label: 'buildings.locationEn', controlName: 'locationEn', direction: 'ltr', icon: 'place', placeholder: 'buildings.locationEn' },
//       { label: 'buildings.locationAr', controlName: 'locationAr', direction: 'rtl', icon: 'place', placeholder: 'buildings.locationAr' },
//     ];

//     const dialogRef = this.dialog.open(CustomFormModalComponent, {
//       data: {
//         title: mode === 'add' ? 'buildings.addTitle' : 'buildings.editTitle',
//         formGroup,
//         fields,
//         submitLabel: mode === 'add' ? 'buttons.add' : 'buttons.save',
//       },
//       width: '500px',
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         if (mode === 'add') {
//           this.service.create(result).subscribe(() => this.fetch());
//         } else if (building?.id) {
//           this.service.update(building.id, result).subscribe(() => this.fetch());
//         }
//       }
//     });
//   }

//   onDelete(id: number) {
//     if (confirm('Are you sure?')) {
//       this.service.delete(id).subscribe(() => this.fetch());
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';

import { Building } from './buildings.model';
import { BuildingsService } from './buildings.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomFormModalComponent } from '../../../shared/components/custom-form-modal/custom-form-modal.component';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})

export class BuildingsComponent implements OnInit {
  buildings: Building[] = [];
  viewMode: 'table' | 'grid' = 'table';

  columns = [
    {
      columnDef: 'id',
      header: '#',
      cell: (b: Building) => `${b.id}`,
    },
    {
      columnDef: 'nameEn',
      header: 'buildings.nameEn',
      cell: (b: Building) => b.nameEn,
    },
    {
      columnDef: 'nameAr',
      header: 'buildings.nameAr',
      cell: (b: Building) => b.nameAr,
    },
    {
      columnDef: 'locationEn',
      header: 'buildings.locationEn',
      cell: (b: Building) => b.locationEn,
    },
    {
      columnDef: 'locationAr',
      header: 'buildings.locationAr',
      cell: (b: Building) => b.locationAr,
    }
  ];

  constructor(
    private service: BuildingsService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.service.getAll().subscribe(data => (this.buildings = data));
  }

  openModal(mode: 'add' | 'edit', building?: Building) {
    const formGroup = this.fb.group({
      nameEn: [building?.nameEn || '', Validators.required],
      nameAr: [building?.nameAr || '', Validators.required],
      locationEn: [building?.locationEn || '', Validators.required],
      locationAr: [building?.locationAr || '', Validators.required],
    });

    const fields = [
      { label: 'buildings.nameEn', controlName: 'nameEn', direction: 'ltr', icon: 'location_city' },
      { label: 'buildings.nameAr', controlName: 'nameAr', direction: 'rtl', icon: 'location_city' },
      { label: 'buildings.locationEn', controlName: 'locationEn', direction: 'ltr', icon: 'place' },
      { label: 'buildings.locationAr', controlName: 'locationAr', direction: 'rtl', icon: 'place' },
    ];

    const dialogRef = this.dialog.open(CustomFormModalComponent, {
      data: {
        title: mode === 'add' ? 'buildings.addTitle' : 'buildings.editTitle',
        formGroup,
        fields,
        submitLabel: mode === 'add' ? 'buttons.add' : 'buttons.save',
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'add') {
          this.service.create(result).subscribe(() => this.fetch());
        } else if (building?.id) {
          this.service.update(building.id, result).subscribe(() => this.fetch());
        }
      }
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe(() => this.fetch());
    }
  }
}
