import { Injectable, isDevMode } from '@angular/core';
import { Http } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
  private claims: any;
  private apiServer = isDevMode ? 'http://localhost:3000' : '';

  constructor(private http: Http) { }

  getClaims(): any {
    const token = this.getToken();
    if (!token) {
      return {};
    }
    this.claims = this.claims || jwt_decode(token);
    return this.claims;
  }

  clearClaims(): void {
    this.claims = null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  login(username: string, password: string): Promise<void> {
    return this.http.post(`${this.apiServer}/api/auth/login`, { username, password })
      .toPromise()
      .then(response => {
        this.setToken(response.text());
      })
      .catch(this.handleError);
  }

  logout(): void {
    this.clearToken();
    this.clearClaims();
  }

  register(username: string, password: string): Promise<void> {
    return this.http.post(`${this.apiServer}/api/auth/user`, { username, password })
      .toPromise()
      .then(response => {
        this.setToken(response.text());
      })
      .catch(this.handleError);
  }

  private setToken(token: string): void {
    if (token) {
      sessionStorage.authToken = token;
    } else {
      delete sessionStorage.authToken;
    }
  }

  private clearToken(): void {
    this.setToken(null);
  }

  getToken(): string {
    return sessionStorage.authToken;
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 401) {
      return Promise.reject('Invalid username or password');
    } else {
      return Promise.reject(error.message || error.statusText || error);
    }
  }
}
