import { TestBed, inject } from '@angular/core/testing';

import { TimesheetService } from './timesheet.service';
import {HttpModule} from '@angular/http';
import {TokenService} from './token.service';

describe('TimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        TimesheetService,
        TokenService
      ]
    });
  });

  it('should be created', inject([TimesheetService], (service: TimesheetService) => {
    expect(service).toBeTruthy();
  }));
});
