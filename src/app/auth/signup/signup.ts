import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Users } from '../../services/users';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';
import { PasswordPolicyService } from '../../services/password-policy';
import { DisplayPolicy } from "../../display-policy/display-policy";
import { PasswordPolicyModel } from '../../models/password-policy.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, DisplayPolicy,CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    authentication: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
    confirmPassword: new FormControl('', Validators.required), 
    role: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    expiry: new FormControl(false, Validators.required),
    duration: new FormControl(1, [Validators.required, Validators.min(1)])
  }, { validators: Signup.passwordsMatch }); // <-- add custom validator

  passwordPolicy: PasswordPolicyModel | undefined ;

  constructor(private userService: Users, private router: Router, private policyService: PasswordPolicyService) {}

  ngOnInit(): void {
    // fetch policy when signup loads
    this.policyService.getPolicy().subscribe({
      next: (policy) => {
        this.passwordPolicy = policy;
      },
      error: (err) => console.error('Error loading policy', err)
    });
  }
  // Custom validator for password match
  static passwordsMatch(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  //getter methods
  get username() { return this.profileForm.get('username'); }
  get email() { return this.profileForm.get('email'); }
  get authentication() { return this.profileForm.get('authentication'); }
  get password() { return this.profileForm.get('password'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }
  get role() { return this.profileForm.get('role'); }
  get reason() { return this.profileForm.get('reason'); }
  get expiry() { return this.profileForm.get('expiry'); }
  get duration() { return this.profileForm.get('duration'); }

  onSubmit() {
    if (this.profileForm.invalid) {
      if (this.profileForm.errors?.['passwordMismatch']) {
        alert('Passwords do not match!');
      }
      return;
    }

    const newUser: User = {
      username: this.username?.value!,
      email: this.email?.value!,
      authentication: this.authentication?.value || 'Local',
      password: this.password?.value!,
      role: this.role?.value!,
      reason: this.reason?.value || '-',
      expiry: this.expiry?.value ?? false,
      duration: this.duration?.value ?? 0
    };

    // Check for duplicate email
    this.userService.getUsers().subscribe({
      next: (users) => {
        const exists = users.some(u => u.email === newUser.email);
        if (exists) {
          alert('Email already exists! Please try another one.');
        } else {
          // Save new user
          this.userService.addUser(newUser).subscribe({
            next: () => {
              alert('Signup successful! Please login.');
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Error adding user:', err);
              alert('Could not save user.');
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