import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { ServiceComponent } from './components/service/service.component';
import { HistoryComponent } from './components/history/history.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RefuelingComponent } from '@@components/refueling/refuelingComponent';
import { ExpenseComponent } from '@@components/expense/expense.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'footer',
        component: FooterComponent,
      },
      {
        path: 'vehicle',
        component: VehicleComponent,
      },
      {
        path: 'vehicle/:id/refueling',
        component: RefuelingComponent,
      },
      {
        path: 'vehicle/:id/service',
        component: ServiceComponent,
      },
      {
        path: 'vehicle/:id/expense',
        component: ExpenseComponent,
      },
      {
        path: 'vehicle/:id/history',
        component: HistoryComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: '',
        redirectTo: '/vehicle',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
