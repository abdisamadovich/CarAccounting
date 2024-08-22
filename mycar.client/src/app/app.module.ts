// Imports
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { FormFieldModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { IconsModule } from "@progress/kendo-angular-icons";

// Declarations
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceComponent } from './components/service/service.component';
import { HistoryComponent } from './components/history/history.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseComponent } from './components/expense/expense.component';
import { RefuelingComponent } from '@@components/refueling/refueling.component';
import { DeleteCarComponent } from '@@components/delete-car/delete-car.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    RefuelingComponent,
    ServiceComponent,
    HistoryComponent,
    ReportsComponent,
    ExpenseComponent,
    DeleteCarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    DateInputsModule,
    IntlModule,
    LabelModule,
    FormFieldModule,
    ButtonsModule,
    IconsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      // Add ToastrModule with forRoot method
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
