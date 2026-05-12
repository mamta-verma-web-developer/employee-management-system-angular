import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'add',
    component: EmployeeFormComponent
  },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent
  },
  {
    path: 'detail/:id',
    component: EmployeeDetailComponent
  }
];