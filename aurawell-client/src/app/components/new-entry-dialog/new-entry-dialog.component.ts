import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { EntriesService } from '../../services/entries.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-new-entry-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-entry-dialog.component.html',
  styleUrls: ['./new-entry-dialog.component.css']
})
export class NewEntryDialogComponent {
  newEntryForm: FormGroup;
  email: string;

  constructor(
    private fb: FormBuilder,
    private entriesService: EntriesService,
    public dialogRef: MatDialogRef<NewEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ) {
    this.email = data.email;
    this.newEntryForm = this.fb.group({
      content: ['', [Validators.required]]
    });
  }

  onSubmit() {

      const entryContent = this.newEntryForm.get('content')?.value;
      
      const newEntry = {
        content: entryContent,
        date: new Date().toISOString()
      };

      console.log('New entry:', newEntry);

      this.entriesService.addEntry(this.email , newEntry.content).subscribe(
        (response) => {
          
          this.dialogRef.close({
            content: newEntry.content,
            entryId: response.newEntry._id,
            date: newEntry.date,
            mood: response.newEntry.mood,
            tips: response.newEntry.tips
          });
        },
        (error) => {
          console.error('Error adding entry:', error);
        }
      );
    
  }
}
