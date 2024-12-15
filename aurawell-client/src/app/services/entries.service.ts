import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import DiaryEntry  from '../models/dairy-entry.model';  

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private apiUrl = `http://localhost:5000/api/diary`; 

  constructor(private http: HttpClient) {}

  addEntry(email: string, content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-entry`, { email, content }).pipe(
      catchError(this.handleError)
    );
  }

  getEntries(email: string): Observable<DiaryEntry[]> {
    return this.http.get<DiaryEntry[]>(`${this.apiUrl}/get-entries/${localStorage.getItem("email")}`).pipe(
      catchError(this.handleError)
    );
  }

  editEntry(entryId: string, content: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit-entry/${entryId}`, { content }).pipe(
      catchError(this.handleError)
    );
  }

  deleteEntry(entryId: string, email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-entry/${entryId}`, { 
      body: { email } 
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.log(error);
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
