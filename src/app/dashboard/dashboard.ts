import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Users } from '../services/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,       //Standalone component (no need to declare in NgModule)
  imports: [CommonModule], //Import CommonModule for *ngIf, *ngFor
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  // Will hold the currently logged-in user (fetched from sessionStorage)
  currentUser: User | null = null;

  // Will hold the list of all users (only loaded if current user is Admin)
  users: User[] = [];

  constructor(private userService: Users, private router: Router) {}

  ngOnInit(): void {
    // Get the logged-in user from sessionStorage
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      console.log('Current user:', this.currentUser);
    }

    //If current user is Admin, load all users from backend (db.json)
    if (this.currentUser?.role?.toLowerCase() === 'admin') {
      this.userService.getUsers().subscribe({
        next: (data) => {
          // Normalize each user so all required fields exist
          // (Fixes TypeScript error: password missing in some users)
          this.users = data.map(u => ({
            id: u.id ?? '',
            username: u.username ?? '-',
            email: u.email ?? '-',
            role: u.role ?? '-',
            authentication: u.authentication ?? 'Local',
            reason: u.reason ?? '-',
            expiry: u.expiry ?? false,
            duration: u.duration ?? 0,
            password: u.password ?? ''   // Always include password (required in User model)
          }));

          console.log('Fetched users:', this.users);
        },
        error: (err) => console.error('Error loading users:', err)
      });
    }
  }

  // trackBy function for better performance in *ngFor (Angular reuses DOM elements)
  trackById(index: number, item: User): any {
    return item.id ?? index;
  }

  // Logout: Clear currentUser from sessionStorage and redirect to login page
  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
