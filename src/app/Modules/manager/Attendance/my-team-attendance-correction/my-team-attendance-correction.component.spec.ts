import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamAttendanceCorrectionComponent } from './my-team-attendance-correction.component';

describe('MyTeamAttendanceCorrectionComponent', () => {
  let component: MyTeamAttendanceCorrectionComponent;
  let fixture: ComponentFixture<MyTeamAttendanceCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamAttendanceCorrectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamAttendanceCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
