import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../shared/models/employee.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})

export class EmployeeDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  get isDarkTheme(): boolean {
  return document.body.classList.contains('dark-theme');
}
  private employeeService = inject(EmployeeService);
  employee!: Employee;

  ngOnInit(): void {
    const employeeId:any = this.route.snapshot.paramMap.get('id');
    this.getEmployee(employeeId);
  }

  getEmployee(id: any): void {
    this.employeeService
      .getEmployeeById(id).pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.employee = response;
      });
  }

  ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}