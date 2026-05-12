import { Routes } from '@angular/router';

import { authGuard }
from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',

    loadComponent: () =>

      import(
        './features/auth/login/login.component'
      ).then(c => c.LoginComponent)

  },

  {
    path: 'employee',

    canActivate: [authGuard],

    loadChildren: () =>

      import(
        './features/employee/employee.routes'
      ).then(r => r.EMPLOYEE_ROUTES)

  }

];