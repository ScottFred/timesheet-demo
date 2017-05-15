import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Timesheet, TimesheetProject} from '../models/timesheet';
import { Project} from '../models/project';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  @Input() timesheet: Timesheet;
  @Input() projects: Project[];
  @Input() canEdit: boolean;
  @Input() isEditing: boolean;
  @Output() beginEdit = new EventEmitter();
  @Output() endEdit = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.canEdit);
  }

  onDeleteTimesheetProjectClick(timesheetProject: TimesheetProject) {
    const i = this.timesheet.projects.indexOf(timesheetProject);
    this.timesheet.projects.splice(i, 1);
  }

  onAddTimesheetProjectClick() {
    const newTimesheetProject = new TimesheetProject();
    newTimesheetProject.hours = [0, 0, 0, 0, 0, 0, 0];
    this.timesheet.projects.push(newTimesheetProject);
  }

  calcTotalHoursByTimesheetProject(timesheetProject: TimesheetProject): number {
    let result = 0;
    for (let i = 0; i < timesheetProject.hours.length; i++) {
      result += timesheetProject.hours[i];
    }
    return result;
  }

  calcTotalHoursByDay(dayNumber: number): number {
    let result = 0;
    for (let i = 0; i < this.timesheet.projects.length; i++) {
      result += this.timesheet.projects[i].hours[dayNumber];
    }
    return result;
  }

  calcTotalHours(): number {
    let result = 0;
    for (let i = 0; i < this.timesheet.projects.length; i++) {
      result += this.calcTotalHoursByTimesheetProject(this.timesheet.projects[i]);
    }
    return result;
  }


}
