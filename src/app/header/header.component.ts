import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.tokenService.hasToken();
  }

  onLogoutClick() {
    this.authenticationService.logout();
  }
}
