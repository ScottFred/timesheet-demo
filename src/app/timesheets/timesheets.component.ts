import { Component, OnInit } from '@angular/core';
import {TimesheetService} from '../services/timesheet.service';
import {Timesheet} from '../models/timesheet';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {ClaimsService} from '../services/claims.service';

// TODO: Sort timesheets

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {
  title = 'Timesheets';
  timesheets: Timesheet[];
  projects: Project[];
  editTimesheet: Timesheet;
  isLoading = true;
  isSaving = false;

  constructor(
    private claimsService: ClaimsService,
    private projectService: ProjectService,
    private timesheetService: TimesheetService) { }

  ngOnInit() {
    const username = this.claimsService.getClaims().username;
    this.title = `${username}'s Timesheets`;

    this.projectService.getProjects()
      .then(projects => {
        this.projects = projects;
        this.timesheetService.getTimesheets()
          .then(timesheets => {
            this.timesheets = timesheets;
            this.isLoading = false;
          });
      });
  }

  onAddWeekClick() {
    const newTimesheet = new Timesheet();
    newTimesheet.projects = [{
      name: this.projects[0].name,
      hours: [0, 0, 0, 0, 0, 0, 0]
    }];
    this.editTimesheet = newTimesheet;
    this.timesheets.push(newTimesheet);
  }

  isEditingTimesheet(timesheet: Timesheet) {
    if (timesheet) {
      return timesheet === this.editTimesheet;
    } else {
      return !!this.editTimesheet;
    }
  }

  onTimesheetBeginEdit(timesheet: Timesheet) {
    this.editTimesheet = timesheet;
  }

  onTimesheetEndEdit(timesheet: Timesheet, save: boolean) {
    if (save) {
      this.isSaving = true;
      this.timesheetService.saveTimesheet(timesheet)
        .then(() => {
          this.editTimesheet = null;
          this.isSaving = false;
        });
    } else {
      this.editTimesheet = null;
      if (!timesheet._id) {
        this.removeTimesheet(timesheet);
      }
    }
  }

  onTimesheetDelete(timesheet: Timesheet) {
    if (timesheet._id) {
      this.isSaving = true;
      this.timesheetService.deleteTimesheet(timesheet._id)
        .then(() => {
          this.editTimesheet = null;
          this.removeTimesheet(timesheet);
          this.isSaving = false;
        });
    } else {
      this.editTimesheet = null;
      this.removeTimesheet(timesheet);
    }
  }

  private removeTimesheet(timesheet: Timesheet) {
    this.timesheets.splice(this.timesheets.indexOf(timesheet), 1);
  }
}
