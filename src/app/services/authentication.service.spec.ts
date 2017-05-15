import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import {HttpModule} from '@angular/http';
import {TokenService} from './token.service';
import {ClaimsService} from './claims.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AuthenticationService,
        ClaimsService,
        TokenService
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
