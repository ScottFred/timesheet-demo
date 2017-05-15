import { TestBed, inject } from '@angular/core/testing';

import { TimesheetService } from './timesheet.service';
import {HttpModule} from '@angular/http';
import {AuthenticationService} from './authentication.service';

describe('TimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        TimesheetService,
        AuthenticationService
      ]
    });
  });

  it('should be created', inject([TimesheetService], (service: TimesheetService) => {
    expect(service).toBeTruthy();
  }));
});
