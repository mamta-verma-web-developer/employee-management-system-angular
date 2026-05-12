import { Injectable, signal } from '@angular/core';
import { Employee } from '../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStore {

  employees = signal<Employee[]>([]);

  setEmployees(data: Employee[]): void {
    this.employees.set(data);
  }

  addEmployee(employee: Employee): void {
    this.employees.update((employees) => [
      ...employees,
      employee
    ]);
  }

  deleteEmployee(id: number): void {
    this.employees.update((employees) =>
      employees.filter(employee => employee.id !== id)
    );
  }
}