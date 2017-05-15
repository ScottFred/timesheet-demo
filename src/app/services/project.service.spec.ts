import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {HttpModule, XHRBackend} from '@angular/http';
import {TokenService} from './token.service';
import {MockBackend} from '@angular/http/testing';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ProjectService,
        TokenService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
