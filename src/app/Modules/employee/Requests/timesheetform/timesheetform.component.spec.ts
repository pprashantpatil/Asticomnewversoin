import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetformComponent } from './timesheetform.component';

describe('TimesheetformComponent', () => {
  let component: TimesheetformComponent;
  let fixture: ComponentFixture<TimesheetformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
