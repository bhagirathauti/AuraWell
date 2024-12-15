import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialogModule 
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-entry-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  styles: [`
    .dialog-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .dialog-title {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
      margin-bottom: 16px;
    }

    .entry-textarea {
      width: 100%;
      min-height: 200px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
    }
    .w-full {
      width: 100%;
    }
  `],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">Edit Diary Entry</h2>
      
      <mat-dialog-content>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Entry Content</mat-label>
          <textarea 
            matInput 
            [(ngModel)]="data.content" 
            class="entry-textarea"
            placeholder="Write your thoughts here..."
          ></textarea>
        </mat-form-field>
      </mat-dialog-content>
      
      <mat-dialog-actions class="dialog-actions">
        <button 
          mat-stroked-button 
          (click)="dialogRef.close()"
        >
          Cancel
        </button>
        <button 
          mat-flat-button 
          color="primary" 
          (click)="dialogRef.close(data)"
        >
          Save Changes
        </button>
      </mat-dialog-actions>
    </div>
  `
})
export class EditEntryDialog {
  constructor(
    public dialogRef: MatDialogRef<EditEntryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, content: string }
  ) {}
}