import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {HttpModule} from '@angular/http';
import {AuthenticationService} from './authentication.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ProjectService,
        AuthenticationService
      ]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
