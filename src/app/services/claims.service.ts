import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {TokenService} from './token.service';

@Injectable()
export class ClaimsService {
  private claims: any;

  constructor(private tokenService: TokenService) { }

  getClaims(): any {
    const token = this.tokenService.getToken();
    if (!token) {
      return {};
    }
    this.claims = this.claims || jwt_decode(token);
    return this.claims;
  }

  clearClaims(): void {
    this.claims = null;
  }
}
