import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthenticationService} from '../services/authentication.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ClaimsService} from '../services/claims.service';
import {TokenService} from '../services/token.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule
      ],
      declarations: [
        RegisterComponent
      ],
      providers: [
        AuthenticationService,
        ClaimsService,
        TokenService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
