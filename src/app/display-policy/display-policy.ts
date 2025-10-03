import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { PasswordPolicyModel } from '../models/password-policy.model';

@Component({
  selector: 'app-display-policy',
  standalone: true,  
  imports: [CommonModule],
  templateUrl: './display-policy.html',
  styleUrl: './display-policy.css'
})
export class DisplayPolicy {

     @Input() policy!: PasswordPolicyModel;// receives the policy object
}
