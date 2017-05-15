import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/project';
import {ClaimsService} from '../services/claims.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  title = 'Projects';
  projects: Project[];
  editProject: Project;
  isLoading = true;
  isSaving = false;

  constructor(
    private claimsService: ClaimsService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    const username = this.claimsService.getClaims().username;
    this.title = `${username}'s Projects`;

    this.projectService.getProjects()
      .then(projects => {
        this.projects = _.sortBy(projects, x => x.name.toLowerCase());
        this.isLoading = false;
      });
  }

  isEditingProject(project: Project): boolean {
    if (project) {
      return project === this.editProject;
    } else {
      return !!this.editProject;
    }
  }

  onAddProjectClick() {
    const newProject = new Project();
    this.editProject = newProject;
    this.projects.push(newProject);
  }

  onProjectBeginEdit(project: Project) {
    this.editProject = project;
  }

  onProjectEndEdit(project: Project, save: boolean) {
    if (save) {
      this.isSaving = true;
      this.projectService.saveProject(project)
        .then(() => {
          this.editProject = null;
          this.projects = _.sortBy(this.projects, x => x.name.toLowerCase());
          this.isSaving = false;
        });
    } else {
      this.editProject = null;
      if (project._id === null) {
        this.removeProject(project);
      }
    }
  }

  onProjectDelete(project: Project) {
    if (project._id) {
      this.isSaving = true;
      this.projectService.deleteProject(project._id)
        .then(() => {
          this.editProject = null;
          this.removeProject(project);
          this.isSaving = false;
        });
    } else {
      this.editProject = null;
      this.removeProject(project);
    }
  }

  private removeProject(project: Project) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }
}
