import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatToolbarModule, CommonModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatListModule, MatGridListModule, MatDialogModule, MatProgressSpinnerModule, RouterLink, ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login submitted', this.loginForm.value);
      // Implement your login logic here
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('email', response.email);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
