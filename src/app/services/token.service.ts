import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  hasToken(): boolean  {
    return !!this.getToken();
  }

  setToken(token: string) {
    if (token) {
      sessionStorage.authToken = token;
    } else {
      delete sessionStorage.authToken;
    }
  }

  clearToken() {
    this.setToken(null);
  }

  getToken(): string {
    return sessionStorage.authToken;
  }
}
