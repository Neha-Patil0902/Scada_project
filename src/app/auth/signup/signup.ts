import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../services/users';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-signup',
  standalone: true,     // make it standalone if you’re importing modules here
  imports: [FormsModule, ReactiveFormsModule,NgIf],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})

export class Signup{

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    role: new FormControl('User', Validators.required),
    reason: new FormControl('', Validators.required),
    expiry: new FormControl(false, Validators.required), 
    duration: new FormControl(0, [Validators.required, Validators.min(1)]) 
  });

  constructor(private userService: Users, private router: Router) {}

   // Add getters for template
  get username() { return this.profileForm.get('username'); }
  get email() { return this.profileForm.get('email'); }
  get password() { return this.profileForm.get('password'); }
  get role() { return this.profileForm.get('role'); }
  get reason() { return this.profileForm.get('reason'); }
  get expiry() { return this.profileForm.get('expiry'); }
  get duration() { return this.profileForm.get('duration'); }

  onSubmit() {
    if (this.profileForm.valid) {
      const newUser: User = this.profileForm.value as User;

      // First check if email already exists in db.json
      this.userService.getUsers().subscribe({
        next: (users) => {
          const exists = users.some(u => u.email === newUser.email);

          if (exists) {
            alert(' Email already exists! Please try another one.');
          } else {
            
            // If not exists → save new user
            this.userService.addUser(newUser).subscribe({
              next: () => {
                alert(' Signup successful! Please login.');
                this.router.navigate(['/login']);
              },
              error: (err) => {
                console.error('Error adding user:', err);
                alert(' Could not save user.');
              }
            });
          }
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          alert('Could not check existing users.');
        }
      });
    }
  }
}

// get username(){
//  return this.profileForm.get('username');
// }
// get password(){
//  return this.profileForm.get('password');
// }
// get email(){
//  return this.profileForm.get('email');
// }
// get role(){
//  return this.profileForm.get('role');
// }
 

 


