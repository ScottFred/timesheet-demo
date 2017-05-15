import { Injectable, isDevMode } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {TokenService} from './token.service';
import {ClaimsService} from './claims.service';

@Injectable()
export class AuthenticationService {
  private apiServer = isDevMode() ? 'http://localhost:3000' : '';

  constructor(
    private http: Http,
    private tokenService: TokenService,
    private claimsService: ClaimsService
  ) { }

  login(username: string, password: string): Promise<void> {
    return this.http.post(`${this.apiServer}/api/auth/login`, { username, password })
      .toPromise()
      .then(response => {
        this.tokenService.setToken(response.text());
      })
      .catch(this.handleError);
  }

  logout(): void {
    this.tokenService.clearToken();
    this.claimsService.clearClaims();
  }

  register(username: string, password: string): Promise<void> {
    return this.http.post(`${this.apiServer}/api/auth/user`, { username, password })
      .toPromise()
      .then(response => {
        this.tokenService.setToken(response.text());
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 401) {
      return Promise.reject('Invalid username or password');
    } else {
      return Promise.reject(error.message || error.statusText || error);
    }
  }
}
