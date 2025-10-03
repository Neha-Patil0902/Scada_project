import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordPolicyService } from '../services/password-policy';
import { PasswordPolicyModel } from '../models/password-policy.model';
import { Router } from '@angular/router';
import { DisplayPolicy } from "../display-policy/display-policy";

@Component({
  selector: 'app-password-policy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DisplayPolicy],
  templateUrl: './password-policy.html',
  styleUrl: './password-policy.css'
})
export class PasswordPolicy implements OnInit {

  showPolicy = false; // initially hidden
  policyForm!: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private policyService: PasswordPolicyService,
    private router: Router
  ) {}

  ngOnInit(): void {
     // initialize form with default values
     this.policyForm = this.fb.group({
      policyId: [1],
      requireUppercase: [false],
      requireLowercase: [false],
      requireDigit: [false],
      requireSpecialChar: [false],
      passwordExpiryDays: [30, [Validators.required, Validators.min(1)]],
      passwordHistoryCount: [5, [Validators.required, Validators.min(1)]]
    });

  // load existing policy
    this.policyService.getPolicy().subscribe((policy: PasswordPolicyModel) => {
      this.policyForm.patchValue({
        requireUppercase: policy.requireUppercase === 1,
        requireLowercase: policy.requireLowercase === 1,
        requireDigit: policy.requireDigit === 1,
        requireSpecialChar: policy.requireSpecialChar === 1,
        passwordExpiryDays: policy.passwordExpiryDays,
        passwordHistoryCount: policy.passwordHistoryCount
      });
    });
  }

  savePolicy():void {
    if (this.policyForm.valid) {
      // getRawValue returns the shape of PasswordPolicyModel exactly
     const formValue = this.policyForm.getRawValue();
     
       // convert booleans to 0/1 before saving
      const newPolicy: PasswordPolicyModel = {
        requireUppercase: formValue.requireUppercase ? 1 : 0,
        requireLowercase: formValue.requireLowercase ? 1 : 0,
        requireDigit: formValue.requireDigit ? 1 : 0,
        requireSpecialChar: formValue.requireSpecialChar ? 1 : 0,
        passwordExpiryDays: formValue.passwordExpiryDays,
        passwordHistoryCount: formValue.passwordHistoryCount
      };
     
      this.policyService.updatePolicy(newPolicy).subscribe({
        next: () => {
      
          alert('Password Policy Updated Successfully!!!!! ')
          console.log('Password Policy updated successfully');
          // after success show table
          this.showPolicy = true;
        },
        error: (err) => {
          console.error('Error updating Password Policy', err);
        }
      });
    }
  }

  //displayPwdPolicy(){
  // this.router.navigate(['/displayPolicy']);
  // }

  onClose(): void {
    this.router.navigate(['/dashboard']);
    this.showPolicy = false; // hide again if needed
  }

} 