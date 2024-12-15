import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Base API URL

  constructor(private http: HttpClient) { }

  /**
   * Sign in the user
   * @param email User's email
   * @param password User's password
   * @returns Observable<any>
   */
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  /**
   * Register a new user
   * @param email User's email
   * @param password User's password
   * @returns Observable<any>
   */
  signup(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/signup`, body);
  }
}
