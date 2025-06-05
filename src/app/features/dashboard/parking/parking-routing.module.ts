import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingAreasComponent } from './parking-areas/parking-areas.component';

const routes: Routes = [
  { path: 'areas', component: ParkingAreasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule {}
