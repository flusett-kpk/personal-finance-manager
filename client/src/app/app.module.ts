import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfCategoriesComponent } from './pages/list-of-categories/list-of-categories.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { ListOfOperationsComponent } from './pages/list-of-operations/list-of-operations.component';
import { AddOperationComponent } from './pages/add-operation/add-operation.component';
import { ReportGeneratorComponent } from './pages/report-generator/report-generator.component';
import { ReportPeriodGroupedByCategoriesComponent } from './pages/report-period-grouped-by-categories/report-period-grouped-by-categories.component';
import { ReportDayByDayComponent } from './pages/report-day-by-day/report-day-by-day.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { LoginComponent } from './pages/login/login.component'
import { WebRequestInterceptor } from './web-request.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { EditOperationComponent } from './pages/edit-operation/edit-operation.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfCategoriesComponent,
    AddCategoryComponent,
    ListOfOperationsComponent,
    AddOperationComponent,
    ReportGeneratorComponent,
    ReportPeriodGroupedByCategoriesComponent,
    ReportDayByDayComponent,
    EditCategoryComponent,
    LoginComponent,
    RegisterComponent,
    EditOperationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
