import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'parking',
        loadChildren: () =>
          import('./features/dashboard/parking/parking.module').then(m => m.ParkingModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'subscribers',
        loadChildren: () =>
          import('./features/subscribers/subscribers.module').then(m => m.SubscribersModule),
      },
 {
  path: 'company-info',
  loadChildren: () =>
    import('./features/company-info/company-info.module').then(m => m.CompanyInfoModule),
},
{
  path: 'reports',
  loadChildren: () =>
    import('./features/reports/reports.routes').then(m => m.routes),
},




    ],
  },
];
