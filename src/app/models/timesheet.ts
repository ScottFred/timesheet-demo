export class Timesheet {
  _id: string;
  weekEnding: Date;
  projects: TimesheetProject[];
}

export class TimesheetProject {
  name: string;
  hours: number[];
}
