import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../shared/models/employee.model';
import { EmployeeStore } from '../../../store/employee.store';
import { ThemeService } from '../../../core/services/theme.service';
import { RoleService } from '../../../core/services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { GridModule, PageService, SortService, FilterService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GridModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    ToolbarService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog);
  private employeeStore = inject(EmployeeStore);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  themeService = inject(ThemeService);
  roleService = inject(RoleService);
  employeeList = this.employeeStore.employees;
  pageSettings = { pageSize: 5 };
  toolbar = ['Search'];
  allEmployees: Employee[] = [];
  selectedDepartment = '';
  selectedStatus = '';

  ngOnInit(): void {
    document.title = 'Employee Management System';
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({
        next: (response) => {
          this.allEmployees = response;
          this.employeeStore.setEmployees(response);
        },

        error: (error) => {
          console.error(error);
        }
      });
  }

  addEmployee(): void {
    this.router.navigate(['/employee/add']);
  }

  editEmployee(data: Employee): void {
    this.router.navigate(['/employee/edit', data.id]);
  }

  deleteEmployee(data: Employee): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '350px',
        data: {
          message: 'Are you sure want to delete this?'
        }
      }
    );

    dialogRef.afterClosed()
    .subscribe(result => {
        if (result) {
          this.employeeService
            .deleteEmployee(data.id!)
            .subscribe(() => {
              this.snackBar.open(
                'Employee Deleted Successfully',
                'Close',
                {
                  duration: 3000
                }
              );

              this.getEmployees();

            });
        }
      });
  }

  viewEmployee(data: Employee): void {
    this.router.navigate([
      '/employee/detail',
      data.id
    ]);
  }

  applyFilters(): void {
    let filteredEmployees = [
      ...this.allEmployees
    ];

    if (this.selectedDepartment) {

      filteredEmployees =
        filteredEmployees.filter(
          employee =>
            employee.department ===
            this.selectedDepartment
        );
    }

    if (this.selectedStatus) {

      filteredEmployees =
        filteredEmployees.filter(
          employee =>
            employee.status ===
            this.selectedStatus
        );
    }

    this.employeeStore.setEmployees(
      filteredEmployees
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}