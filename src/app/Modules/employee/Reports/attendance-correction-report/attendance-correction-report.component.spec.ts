import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCorrectionReportComponent } from './attendance-correction-report.component';

describe('AttendanceCorrectionReportComponent', () => {
  let component: AttendanceCorrectionReportComponent;
  let fixture: ComponentFixture<AttendanceCorrectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCorrectionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceCorrectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
