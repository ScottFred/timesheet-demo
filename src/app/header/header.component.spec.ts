import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationService} from '../services/authentication.service';
import {HttpModule} from '@angular/http';
import {TokenService} from '../services/token.service';
import {ClaimsService} from '../services/claims.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        AuthenticationService,
        TokenService,
        ClaimsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
