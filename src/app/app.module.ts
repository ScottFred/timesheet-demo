import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';

import { AuthenticationService } from './services/authentication.service';
import { ProjectService } from './services/project.service';
import { TimesheetService } from './services/timesheet.service';
import { FooterComponent } from './footer/footer.component';
import { ProjectComponent } from './project/project.component';
import { ErrorHandlerService } from './services/error-handler.service';

import { AuthenticationGuard } from './guards/authentication.guard';
import {TokenService} from './services/token.service';
import {ClaimsService} from './services/claims.service';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetsComponent,
    TimesheetComponent,
    ProjectsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MyDatePickerModule
  ],
  providers: [
    AuthenticationService,
    TokenService,
    ClaimsService,
    ProjectService,
    TimesheetService,
    AuthenticationGuard,
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
