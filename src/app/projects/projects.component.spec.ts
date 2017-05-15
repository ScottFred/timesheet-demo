import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import {FormsModule} from '@angular/forms';
import {ProjectComponent} from '../project/project.component';
import {AuthenticationService} from '../services/authentication.service';
import {HttpModule} from '@angular/http';
import {ProjectService} from '../services/project.service';
import {ClaimsService} from '../services/claims.service';
import {TokenService} from '../services/token.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule
      ],
      declarations: [
        ProjectsComponent,
        ProjectComponent
      ],
      providers: [
        ClaimsService,
        TokenService,
        ProjectService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    component.projects = [];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
