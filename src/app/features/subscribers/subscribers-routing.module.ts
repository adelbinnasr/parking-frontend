import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { SubscribersComponent } from './subscribers.component';
const routes: Routes = [
  { path: 'manage', component: SubscribersComponent },
  { path: 'cards', component: CardsComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule {}
