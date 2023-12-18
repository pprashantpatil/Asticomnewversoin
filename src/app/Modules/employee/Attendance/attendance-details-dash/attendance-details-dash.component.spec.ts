import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetailsDashComponent } from './attendance-details-dash.component';

describe('AttendanceDetailsDashComponent', () => {
  let component: AttendanceDetailsDashComponent;
  let fixture: ComponentFixture<AttendanceDetailsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceDetailsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDetailsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
