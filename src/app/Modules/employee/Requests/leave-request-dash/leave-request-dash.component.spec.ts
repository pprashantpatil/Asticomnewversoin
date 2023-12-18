import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestDashComponent } from './leave-request-dash.component';

describe('LeaveRequestDashComponent', () => {
  let component: LeaveRequestDashComponent;
  let fixture: ComponentFixture<LeaveRequestDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRequestDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
