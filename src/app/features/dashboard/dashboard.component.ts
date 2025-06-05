// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';

// @Component({
//   selector: 'app-dashboard',
//   // standalone: true,
//   imports: [CommonModule, MatCardModule, MatToolbarModule],
//   template: `
//     <mat-toolbar color="primary">Dashboard</mat-toolbar>
//     <div class="dashboard-wrapper">
//       <mat-card>
//         <h2>🚗 Welcome to the Parking Management Dashboard</h2>
//         <p>This is your starting point after login.</p>
//       </mat-card>
//     </div>
//   `,
//   styles: [
//     `
//     .dashboard-wrapper {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 100vh;
//       background-color: #f5f5f5;
//     }
//     mat-card {
//       padding: 2rem;
//       max-width: 600px;
//       width: 100%;
//     }
//     `
//   ]
// })
// export class DashboardComponent {}
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
