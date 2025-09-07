import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';

import { About } from './about/about';

import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
   
   {path:'home', component:Home},
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   {path:'dashboard', component:Dashboard},
   {path:'signup', component:Signup},
   {path:'login', component:Login},
   {path:'about', component:About},
   {path:'contact', component:Contact}
   
];
