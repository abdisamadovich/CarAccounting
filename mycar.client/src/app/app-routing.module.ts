import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceComponent } from './components/service/service.component';
import { HistoryComponent } from './components/history/history.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ExpenseComponent } from '@@components/expense/expense.component';
import { RefuelingComponent } from '@@components/refueling/refueling.component';
import { HeaderComponent } from '@@components/header/header.component';
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
        path: 'vehicle/:vehicleId/refueling',
        component: RefuelingComponent,
      },
      {
        path: 'vehicle/:vehicleId/service',
        component: ServiceComponent,
      },
      {
        path: 'vehicle/:vehicleId/expense',
        component: ExpenseComponent,
      },
      {
        path: 'vehicle/:vehicleId/history',
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
    component: HeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
