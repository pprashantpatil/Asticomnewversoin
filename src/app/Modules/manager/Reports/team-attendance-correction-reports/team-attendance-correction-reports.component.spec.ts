import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceCorrectionReportsComponent } from './team-attendance-correction-reports.component';

describe('TeamAttendanceCorrectionReportsComponent', () => {
  let component: TeamAttendanceCorrectionReportsComponent;
  let fixture: ComponentFixture<TeamAttendanceCorrectionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAttendanceCorrectionReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAttendanceCorrectionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
