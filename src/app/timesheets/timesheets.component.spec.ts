import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetsComponent } from './timesheets.component';
import {TimesheetComponent} from '../timesheet/timesheet.component';
import {TimesheetService} from '../services/timesheet.service';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MyDatePickerModule} from 'mydatepicker';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {ProjectService} from '../services/project.service';

describe('TimesheetsComponent', () => {
  let component: TimesheetsComponent;
  let fixture: ComponentFixture<TimesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        FormsModule,
        MyDatePickerModule
      ],
      declarations: [
        TimesheetsComponent,
        TimesheetComponent
      ],
      providers: [
        TimesheetService,
        ProjectService,
        AuthenticationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
