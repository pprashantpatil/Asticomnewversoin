import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTimesheetReportsComponent } from './team-timesheet-reports.component';

describe('TeamTimesheetReportsComponent', () => {
  let component: TeamTimesheetReportsComponent;
  let fixture: ComponentFixture<TeamTimesheetReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTimesheetReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTimesheetReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
