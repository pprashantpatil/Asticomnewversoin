import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRLeaveRequestDashComponent } from './hrleave-request-dash.component';

describe('HRLeaveRequestDashComponent', () => {
  let component: HRLeaveRequestDashComponent;
  let fixture: ComponentFixture<HRLeaveRequestDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRLeaveRequestDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRLeaveRequestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
