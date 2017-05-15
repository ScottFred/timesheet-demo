import { TestBed, inject } from '@angular/core/testing';

import { TimesheetService } from './timesheet.service';
import {HttpModule, XHRBackend} from '@angular/http';
import {TokenService} from './token.service';
import {MockBackend} from '@angular/http/testing';

describe('TimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        TimesheetService,
        TokenService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([TimesheetService], (service: TimesheetService) => {
    expect(service).toBeTruthy();
  }));
});
