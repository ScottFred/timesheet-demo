import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/project';

// TODO: Sort projects

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
    private authenticationService: AuthenticationService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    const username = this.authenticationService.getClaims().username;
    this.title = `${username}'s Projects`;

    this.projectService.getProjects()
      .then(projects => {
        this.projects = projects;
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
