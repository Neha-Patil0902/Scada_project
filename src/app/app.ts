import { Component, computed, effect, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { Login } from "./auth/login/login";
import { Signup } from './auth/signup/signup';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { About } from './about/about';
import { Contact } from './contact/contact';
import { Header } from './header/header';
import { NgIf } from '@angular/common';
import { Users } from './services/users';


@Component({
  selector: 'app-root',
  imports: [Header,FormsModule,RouterModule, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular_Practice';



  
}