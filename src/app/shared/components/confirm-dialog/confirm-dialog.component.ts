import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ MatDialogModule,
    MatButtonModule],
    providers: [

  {
    provide: MAT_DIALOG_DATA,
    useValue: {
      message:'Test Message'
    }
  },

  {
    provide: MatDialogRef,
    useValue: {}
  }

],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string }
  ) {}
}
