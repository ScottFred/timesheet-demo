import { TestBed, inject } from '@angular/core/testing';
import { ClaimsService } from './claims.service';
import {TokenService} from './token.service';

describe('ClaimsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClaimsService,
        TokenService
      ]
    });
  });

  it('should be created', inject([ClaimsService], (service: ClaimsService) => {
    expect(service).toBeTruthy();
  }));
});
