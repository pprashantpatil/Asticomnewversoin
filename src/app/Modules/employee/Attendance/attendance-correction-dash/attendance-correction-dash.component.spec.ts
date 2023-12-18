import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCorrectionDashComponent } from './attendance-correction-dash.component';

describe('AttendanceCorrectionDashComponent', () => {
  let component: AttendanceCorrectionDashComponent;
  let fixture: ComponentFixture<AttendanceCorrectionDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCorrectionDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceCorrectionDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
