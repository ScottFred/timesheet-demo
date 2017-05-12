import { TimesheetDemoPage } from './app.po';

describe('timesheet-demo App', () => {
  let page: TimesheetDemoPage;

  beforeEach(() => {
    page = new TimesheetDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
