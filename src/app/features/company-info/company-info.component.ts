import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from './company-info.model';
import { CompanyInfoService } from './company-info.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomFormModalComponent } from '../../shared/components/custom-form-modal/custom-form-modal.component';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html'
})
export class CompanyInfoComponent implements OnInit {
  companyInfo: CompanyInfo = {
    id: 0,
    nameAr: '',
    nameEn: '',
    address: '',
    phone: '',
    logoUrl: ''
  };

  constructor(
    private service: CompanyInfoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCompanyInfo();
  }

  loadCompanyInfo() {
    this.service.get().subscribe(data => {
      this.companyInfo = data;
    });
  }

  getFormFields() {
    return [
      { controlName: 'nameAr', label: 'Name (AR)', type: 'text', required: true },
      { controlName: 'nameEn', label: 'Name (EN)', type: 'text', required: true },
      { controlName: 'address', label: 'Address', type: 'textarea' },
      { controlName: 'phone', label: 'Phone', type: 'text' },
      { controlName: 'logoUrl', label: 'Logo URL', type: 'text' }
    ];
  }

  get displayFields() {
    return [
      { label: 'Name (EN):', value: this.companyInfo.nameEn },
      { label: 'Name (AR):', value: this.companyInfo.nameAr },
      { label: 'Address:', value: this.companyInfo.address },
      { label: 'Phone:', value: this.companyInfo.phone },
      { label: 'Logo URL:', value: this.companyInfo.logoUrl }
    ];
  }

  onEdit() {
  const formGroup = new FormGroup({
    nameAr: new FormControl(this.companyInfo.nameAr),
    nameEn: new FormControl(this.companyInfo.nameEn),
    address: new FormControl(this.companyInfo.address),
    phone: new FormControl(this.companyInfo.phone),
    logoUrl: new FormControl(this.companyInfo.logoUrl)
  });

  this.dialog.open(CustomFormModalComponent, {
    data: {
      title: 'Edit Company Info',
      formGroup,
      fields: this.getFormFields(),
      submitLabel: 'Save',
      cancelLabel: 'Cancel'
    },
    width: '500px'
  }).afterClosed().subscribe(result => {
    if (result) {
      const payload: CompanyInfo = {
        id: this.companyInfo.id,       // ✅ Add this line
        ...result                      // Merge the rest of the form data
      };

      if (payload.id > 0) {
        this.service.update(payload.id, payload).subscribe(() => this.loadCompanyInfo());
      } else {
        this.service.create(payload).subscribe(() => this.loadCompanyInfo());
      }
    }
  });
}

}
