export interface Setting {
  id: number;
  key: string;
  value: string;
  description?: string;
  buildingID: number;
  buildingName?: string;     // for view purposes
}
export interface SettingDto {
  id: number;
  key: string;
  value: string;
  description?: string;
  buildingID: number;
}

export interface CreateSettingDto {
  key: string;
  value: string;
  description?: string;
  buildingID: number;
}

export interface UpdateSettingDto {
  id: number;
  key: string;
  value: string;
  description?: string;
  buildingID: number;
}
