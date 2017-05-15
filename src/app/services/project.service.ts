import {Injectable, isDevMode} from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {TokenService} from './token.service';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {
  private apiServer = isDevMode() ? 'http://localhost:3000' : '';

  constructor(
    private http: Http,
    private tokenService: TokenService
  ) { }

  getProjects(): Promise<Project[]> {
    return this.http.get(`${this.apiServer}/api/projects`, this.getRequestOptions())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  saveProject(project: Project): Promise<void> {
    if (project._id) {
      return this.putProject(project);
    } else {
      return this.postProject(project);
    }
  }

  deleteProject(id): Promise<void> {
    return this.http.delete(`${this.apiServer}/api/projects/${id}`, this.getRequestOptions())
      .toPromise()
      .then(() => {})
      .catch(this.handleError);
  }

  private putProject(project: Project): Promise<void> {
    return this.http.put(`${this.apiServer}/api/projects/${project._id}`, project, this.getRequestOptions())
      .toPromise()
      .then(() => {})
      .catch(this.handleError);
  }

  private postProject(project: Project): Promise<void> {
    return this.http.post(`${this.apiServer}/api/projects`, project, this.getRequestOptions())
      .toPromise()
      .then(() => {})
      .catch(this.handleError);
  }

  private getRequestOptions(): RequestOptionsArgs {
    return {
      headers: new Headers({ 'Authorization': `JWT ${this.tokenService.getToken()}` })
    };
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error.statusText || error);
  }
}
