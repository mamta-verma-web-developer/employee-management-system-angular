import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  employeeId!: any;
  previewUrl: string = '';
  employeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    status: ['', Validators.required],
    role: ['', Validators.required],
    image: ['']
  });

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.getEmployeeById();
    }
  }

  getEmployeeById(): void {
    this.employeeService.getEmployeeById(this.employeeId)
      .subscribe((response) => {
        this.employeeForm.patchValue(response);
        this.previewUrl = response.image || '';
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.previewUrl = URL.createObjectURL(file);
      this.employeeForm.patchValue({
        image: this.previewUrl
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    if (this.employeeId) {
      this.employeeService
        .updateEmployee(
          this.employeeId,
          this.employeeForm.value as any
        )
        .subscribe(() => {

          this.snackBar.open(
            'Employee Updated Successfully',
            'Close',
            {
              duration: 3000
            }
          );

          this.router.navigate(['/employee']);
        });

    } else {
      const employeeData: any = {
        ...this.employeeForm.value,
        id: Date.now()
      };
      this.employeeService
        .addEmployee(
          employeeData
        )
        .subscribe(() => {

          this.snackBar.open(
            'Employee Added Successfully',
            'Close',
            {
              duration: 3000
            }
          );

          this.router.navigate(['/employee']);
        });
    }
  }
}