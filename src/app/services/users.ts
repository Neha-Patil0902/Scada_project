import { Injectable } from '@angular/core';
import { User } from '../models/user.models';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Users {
  
  private apiUrl = 'http://localhost:3000/users';
  

  //This is manually data given, this is used when api is not call or not using mock backend
  //private users: User[] = [
    //{ email: 'admin@example.com', username: 'admin', password: 'Admin@123', role: 'Admin' },
    //{ email: 'user@example.com', username: 'user1', password: 'User@123', role: 'User' },
    //{ email:'neha@example.com', username:'Neha', password:'Neha@123', role: 'User' }
  //];


   constructor(private http: HttpClient) {}
  
  //Get all users (for admin Dashboard)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  //Add new user for Signup (automatically add to db.json when we signup and it save permanently in db.json)
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl,user);
  }
  
  // Validate login
  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }
}


