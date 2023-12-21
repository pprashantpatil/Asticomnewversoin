import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeaveReportsComponent } from './team-leave-reports.component';

describe('TeamLeaveReportsComponent', () => {
  let component: TeamLeaveReportsComponent;
  let fixture: ComponentFixture<TeamLeaveReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLeaveReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamLeaveReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
