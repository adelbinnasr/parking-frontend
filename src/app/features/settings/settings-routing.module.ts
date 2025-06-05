import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './plans/plans.component';
import { FlatsComponent } from './flats/flats.component';
import { GeneralStatusesComponent } from './general-statuses/general-statuses.component';
import { SubscriberTypesComponent } from './subscriber-types/subscriber-types.component';
import { BuildingsComponent } from './Buildings/buildings.component';
import { TariffsComponent } from './tariffs/tariffs.component';

const routes: Routes = [
  { path: 'plans', component: PlansComponent },
  { path: 'flats', component: FlatsComponent },
  { path: 'general-statuses', component: GeneralStatusesComponent },
  { path: 'subscriber-types', component: SubscriberTypesComponent },
  { path: 'tariffs', component: TariffsComponent },
  { path: 'subscriber-types', component: SubscriberTypesComponent },
  {
    path: 'buildings',
    component: BuildingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
