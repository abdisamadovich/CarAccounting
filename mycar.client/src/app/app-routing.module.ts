import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { RefuelingComponent } from './components/refueling/refueling.component';
import { ServiceComponent } from './components/service/service.component';
import { ExpenceComponent } from './components/expence/expence.component';
import { HistoryComponent } from './components/history/history.component';
import { ReportsComponent } from './components/reports/reports.component';
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
        path: 'refueling',
        component: RefuelingComponent,
      },
      {
        path: 'service',
        component: ServiceComponent,
      },
      {
        path: 'expence',
        component: ExpenceComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: '',
        redirectTo: '/history',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
