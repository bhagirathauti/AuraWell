import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Check if email exists in localStorage
    const email = localStorage.getItem('email');

    if (email) {
      // Allow navigation if email is found
      return true;
    } else {
      // Redirect to login page if no email in localStorage
      this.router.navigate(['/login']);
      return false;
    }
  }
}
