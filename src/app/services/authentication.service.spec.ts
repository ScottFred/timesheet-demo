import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import {HttpModule, XHRBackend} from '@angular/http';
import {TokenService} from './token.service';
import {ClaimsService} from './claims.service';
import {MockBackend} from '@angular/http/testing';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AuthenticationService,
        ClaimsService,
        TokenService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
