import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {HttpModule} from '@angular/http';
import {TokenService} from './token.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ProjectService,
        TokenService
      ]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
