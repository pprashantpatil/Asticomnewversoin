import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceReportsComponent } from './team-attendance-reports.component';

describe('TeamAttendanceReportsComponent', () => {
  let component: TeamAttendanceReportsComponent;
  let fixture: ComponentFixture<TeamAttendanceReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAttendanceReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAttendanceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
