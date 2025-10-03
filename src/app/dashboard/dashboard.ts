import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Users } from '../services/users';
import { PasswordPolicy } from '../password-policy/password-policy';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  currentUser: User | null = null;
  users: User[] = [];

  constructor(private userService: Users, private router: Router) {}

  ngOnInit(): void {
    // get current logged-in user from sessionStorage
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }

    // if Admin → load all users from db.json
    if (this.currentUser?.role === 'Admin') {
      this.userService.getUsers().subscribe({
        next: (data) => {
          this.users = data;
          console.log('Fetched users:', this.users);
        },
        error: (err) => console.error('Error loading users:', err)
      });
    }
  }

  passwordPolicy(){
   this.router.navigate(['/passwordPolicy']);
  }

  // logout method
  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}