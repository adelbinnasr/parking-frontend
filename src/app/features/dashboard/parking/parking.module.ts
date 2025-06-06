import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingRoutingModule } from './parking-routing.module';

import { ParkingAreasComponent } from './parking-areas/parking-areas.component';

@NgModule({
  declarations: [ParkingAreasComponent],
  imports: [CommonModule, ParkingRoutingModule]
})
export class ParkingModule {}
