import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterClick() {
    this.errorMessage = '';
    this.authenticationService.register(this.username, this.password)
      .then(() => this.router.navigate(['/']),
        error => this.errorMessage = error);
  }
}
