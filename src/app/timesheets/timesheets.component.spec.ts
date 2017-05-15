import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetsComponent } from './timesheets.component';
import {TimesheetComponent} from '../timesheet/timesheet.component';
import {TimesheetService} from '../services/timesheet.service';
import {HttpModule, XHRBackend} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MyDatePickerModule} from 'mydatepicker';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../services/project.service';
import {ClaimsService} from '../services/claims.service';
import {TokenService} from '../services/token.service';
import {MockBackend} from '@angular/http/testing';

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
        ClaimsService,
        TokenService,
        { provide: XHRBackend, useClass: MockBackend }
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
