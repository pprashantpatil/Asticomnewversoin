import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCorrectionFormComponent } from './attendance-correction-form.component';

describe('AttendanceCorrectionFormComponent', () => {
  let component: AttendanceCorrectionFormComponent;
  let fixture: ComponentFixture<AttendanceCorrectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCorrectionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceCorrectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
