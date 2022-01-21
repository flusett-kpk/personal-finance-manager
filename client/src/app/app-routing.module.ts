import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddOperationComponent } from './pages/add-operation/add-operation.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditOperationComponent } from './pages/edit-operation/edit-operation.component';
import { ListOfCategoriesComponent } from './pages/list-of-categories/list-of-categories.component';
import { ListOfOperationsComponent } from './pages/list-of-operations/list-of-operations.component';
import { ReportDayByDayComponent } from './pages/report-day-by-day/report-day-by-day.component';
import { ReportGeneratorComponent } from './pages/report-generator/report-generator.component';
import { ReportPeriodGroupedByCategoriesComponent } from './pages/report-period-grouped-by-categories/report-period-grouped-by-categories.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'add_category', component: AddCategoryComponent },
  { path: 'edit_category', component: EditCategoryComponent },
  { path: 'add_operation', component: AddOperationComponent },
  { path: 'list_of_categories', component: ListOfCategoriesComponent},
  { path: '', redirectTo: 'list_of_categories', pathMatch: 'full'},
  { path: 'list_of_operations', component: ListOfOperationsComponent},
  { path: 'report_day_by_day', component: ReportDayByDayComponent},
  { path: 'report_generator', component: ReportGeneratorComponent},
  { path: 'report_period_grouped_by_categories', component: ReportPeriodGroupedByCategoriesComponent},
  { path: 'edit-category/:categoryId', component: EditCategoryComponent },
  { path: 'edit-operation/:operationId', component: EditOperationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
