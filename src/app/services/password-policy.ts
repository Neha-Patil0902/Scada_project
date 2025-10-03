import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordPolicyModel} from '../models/password-policy.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordPolicyService {
  private apiUrl = 'http://localhost:3001/passwordPolicy '; 

  constructor(private http: HttpClient) {}

  // Get current policy
  getPolicy(): Observable<PasswordPolicyModel> {
    return this.http.get<PasswordPolicyModel>(this.apiUrl);
  }

  // Update policy
  updatePolicy(policy: PasswordPolicyModel): Observable<any> {
    return this.http.put(this.apiUrl, policy);
  }
}