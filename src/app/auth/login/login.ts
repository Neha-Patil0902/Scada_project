import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../services/users';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginForm = new FormGroup({
      email:new FormControl('',[Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      password:new FormControl('',[Validators.required, Validators.minLength(7),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
  });

  constructor(private userService: Users, private router: Router) {}
  
   // getters
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

   onLogin(){
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value as Partial<User>;
    
    //fetch users from db.json
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          // Save to session storage
          sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        alert('Could not connect to server.');
      }
    });
  }
}
 /* get email(){
  return this.loginForm.get('email');
 }
  get password(){
  return this.loginForm.get('password');
 }*/

