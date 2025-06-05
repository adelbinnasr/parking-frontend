import { Component, OnInit } from "@angular/core";
import { CreateSettingDto, SettingDto, UpdateSettingDto } from "./setting.model";
import { SettingsService } from "./settings.service";
import { Building } from "../Buildings/buildings.model";
import { BuildingsService } from "../Buildings/buildings.service";



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  settings: SettingDto[] = [];
  buildings: Building[] = [];
  selectedBuildingId: number | null = null;

  fields: any[] = [];
  formData: any = {};
  modalTitle = 'Settings';
  selectedItem: SettingDto | null = null;

  constructor(
    private settingService: SettingsService,
    private buildingService: BuildingsService
  ) {}

  ngOnInit(): void {
    this.loadBuildings();
  }

  loadBuildings(): void {
    this.buildingService.getAll().subscribe(buildings => {
      this.buildings = buildings;
      if (this.buildings.length > 0) {
        this.selectedBuildingId = this.buildings[0].id;
        this.loadSettings();
      }
    });
  }

  loadSettings(): void {
    if (this.selectedBuildingId === null) return;

   this.settingService.getSettingsByBuilding(this.selectedBuildingId)
  .subscribe(settings => {
    this.settings = settings;
  });

  }

  onAdd(): void {
    this.selectedItem = null;
    this.formData = {
      buildingID: this.selectedBuildingId
    };

    this.openFormModal();
  }

  onEdit(setting: SettingDto): void {
    this.selectedItem = setting;
    this.formData = { ...setting };

    this.openFormModal();
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this setting?')) {
this.settingService.delete(id).subscribe(() => this.loadSettings());
    }
  }

 onSubmit(): void {
  const dto = this.selectedItem
    ? { ...this.formData, id: this.selectedItem.id } // ✅ Merge the ID into the update DTO
    : (this.formData as CreateSettingDto);

  const request$ = this.selectedItem
    ? this.settingService.update(this.selectedItem.id, dto)
    : this.settingService.create(dto);

  request$.subscribe(() => {
    this.loadSettings();
    (document.getElementById('customFormModal') as any)?.close();
  });
}



  getFormFields(): any[] {
    return [
      { key: 'key', label: 'Key', type: 'text', required: true },
      { key: 'value', label: 'Value', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'buildingID',
        label: 'Building',
        type: 'select',
        required: true,
        options: this.buildings.map(b => ({
          value: b.id,
          label: `${b.nameEn} (${b.locationEn})`
        }))
      }
    ];
  }

  private openFormModal(): void {
    this.fields = this.getFormFields();
    (document.getElementById('customFormModal') as any)?.showModal();
  }

  private closeFormModal(): void {
    (document.getElementById('customFormModal') as any)?.close();
  }
}
