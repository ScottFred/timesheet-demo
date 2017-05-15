import {Injectable, isDevMode} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Timesheet } from '../models/timesheet';

@Injectable()
export class TimesheetService {
  private apiServer = isDevMode ? 'http://localhost:3000' : '';

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  getTimesheets(): Promise<Timesheet[]> {
    return this.http.get(`${this.apiServer}/api/timesheets`, this.getRequestOptions())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  saveTimesheet(timesheet: Timesheet): Promise<void> {
    if (timesheet._id) {
      return this.putTimesheet(timesheet);
    } else {
      return this.postTimesheet(timesheet);
    }
  }

  deleteTimesheet(id): Promise<void> {
    return this.http.delete(`${this.apiServer}/api/timesheets/${id}`, this.getRequestOptions())
      .toPromise()
      .then(() => {})
      .catch(this.handleError);
  }

  private putTimesheet(timesheet: Timesheet): Promise<void> {
    return this.http.put(`${this.apiServer}/api/timesheets/${timesheet._id}`, timesheet, this.getRequestOptions())
      .toPromise()
      .then(() => {})
      .catch(this.handleError);
  }

  private postTimesheet(timesheet: Timesheet): Promise<void> {
    return this.http.post(`${this.apiServer}/api/timesheets`, timesheet, this.getRequestOptions())
      .toPromise()
      .then(() => {})
      .catch(this.handleError);
  }

  private getRequestOptions(): RequestOptionsArgs {
    return {
      headers: new Headers({ 'Authorization': `JWT ${this.authenticationService.getToken()}` })
    };
  }

  private handleError(error: any): Promise<any> {
    console.dir(error);
    return Promise.reject(error._body || error.message || error.statusText || error);
  }
}
