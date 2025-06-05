import { Routes } from "@angular/router";
import { IndividualSubscriberComponent } from "./individual-subscriber/individual-subscriber.component";
import { SubscriberSummaryComponent } from "./subscriber-summary.component";

export const routes: Routes = [
  {
    path: 'subscriber',
    component: IndividualSubscriberComponent
  },
   {
    path: 'subscribers-summary',
    component: SubscriberSummaryComponent,
  }

];
