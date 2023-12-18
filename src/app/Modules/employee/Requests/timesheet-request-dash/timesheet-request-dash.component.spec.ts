import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetRequestDashComponent } from './timesheet-request-dash.component';

describe('TimesheetRequestDashComponent', () => {
  let component: TimesheetRequestDashComponent;
  let fixture: ComponentFixture<TimesheetRequestDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetRequestDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetRequestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
