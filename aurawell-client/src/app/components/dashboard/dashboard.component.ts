import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../services/entries.service';  // Adjust path as needed
import DiaryEntry from '../../models/dairy-entry.model';  // Adjust path as needed
import { MatDialog } from '@angular/material/dialog';  
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EditEntryDialog } from '../edit-entry-dialog/edit-entry-dialog.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { NewEntryDialogComponent } from '../new-entry-dialog/new-entry-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent,MatIcon
    , CommonModule, MatProgressSpinner, ReactiveFormsModule,MatError,MatButton

  ],
  providers:[DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  email: string = localStorage.getItem('email') || '';  
  entries: DiaryEntry[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  

  constructor(
    private entriesService: EntriesService,
    public dialog: MatDialog ,
    private datePipe: DatePipe,
    private toast: HotToastService
  ) {
    
  }

  ngOnInit() {
    this.loadEntries();
  }

  // Fetch all diary entries for the logged-in user
  loadEntries() {
    this.loading = true;
    this.entriesService.getEntries(this.email).subscribe(
      (data: DiaryEntry[]) => {
        this.entries = data;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error loading diary entries. Please try again later.';
        this.loading = false;
        console.error('Error loading entries:', error);
      }
    );
  }

  // Handle entry deletion
  deleteEntry(entryId: string) {
    this.entriesService.deleteEntry(entryId, this.email).subscribe(
      response => {
        this.toast.success('Entry deleted successfully');
        this.entries = this.entries.filter(entry => entry._id !== entryId);  // Remove deleted entry from view
      },
      error => {
        console.error('Error deleting entry:', error);
      }
    );
  }

  // Handle entry editing (opens a dialog)
  editEntry(entryId: string, currentContent: string) {
    const dialogRef = this.dialog.open(EditEntryDialog, {
      width: '400px',
      data: { id: entryId, content: currentContent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.entriesService.editEntry(entryId, result.content).subscribe(
          (response) => {
            this.toast.success('Entry updated successfully');
            const updatedEntry = this.entries.find(entry => entry._id === entryId);
            if (updatedEntry) {
              updatedEntry.content = result.content;
            }
          },
          (error) => {
            console.error('Error updating entry:', error);
          }
        );
      }
    });
  }

  addEntry() {
    const dialogRef = this.dialog.open(NewEntryDialogComponent, {
      width: '800px',
      data: { email: this.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toast.success('Entry added successfully');
        this.entries.push(result);
      }
    });
  }

  formatDate(date: string) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  
}
