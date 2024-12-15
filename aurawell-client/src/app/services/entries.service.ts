import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import DiaryEntry  from '../models/dairy-entry.model';  // Assuming you've created a DiaryEntry model

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private apiUrl = `http://localhost:5000/api/diary`;  // Backend API URL

  constructor(private http: HttpClient) {}

  // Add a new diary entry
  addEntry(email: string, content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-entry`, { email, content }).pipe(
      catchError(this.handleError)
    );
  }

  // Get all diary entries for a user
  getEntries(email: string): Observable<DiaryEntry[]> {
    return this.http.get<DiaryEntry[]>(`${this.apiUrl}/get-entries/${localStorage.getItem("email")}`).pipe(
      catchError(this.handleError)
    );
  }

  // Edit an existing diary entry
  editEntry(entryId: string, content: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit-entry/${entryId}`, { content }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a diary entry
  deleteEntry(entryId: string, email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-entry/${entryId}`, { 
      body: { email } 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handler
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      console.log(error);
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
