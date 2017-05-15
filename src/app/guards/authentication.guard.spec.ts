import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {TokenService} from '../services/token.service';

describe('AuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        AuthenticationGuard,
        TokenService,
      ]
    }).compileComponents();
  });

  it('should ...', inject([AuthenticationGuard], (guard: AuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
