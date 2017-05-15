import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {TimesheetsComponent} from './timesheets/timesheets.component';
import {ProjectsComponent} from './projects/projects.component';
import {RegisterComponent} from './register/register.component';
import {AuthenticationGuard} from './guards/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/timesheets', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'timesheets', component: TimesheetsComponent, canActivate: [AuthenticationGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
