import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetComponent } from './timesheet.component';
import {FormsModule} from '@angular/forms';
import {MyDatePickerModule} from 'mydatepicker';
import {Timesheet, TimesheetProject} from '../models/timesheet';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MyDatePickerModule
      ],
      declarations: [
        TimesheetComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    component.projects = [];
    component.timesheet = new Timesheet();
    const timesheetProject = new TimesheetProject();
    timesheetProject.hours = [0, 0, 0, 0, 0, 0, 0];
    component.timesheet.projects = [timesheetProject];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
