import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {AuthenticationService} from './services/authentication.service';
import {HttpModule} from '@angular/http';
import {TokenService} from './services/token.service';
import {ClaimsService} from './services/claims.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
      ],
      providers: [
        AuthenticationService,
        TokenService,
        ClaimsService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
