import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamWeeklyShiftComponent } from './my-team-weekly-shift.component';

describe('MyTeamWeeklyShiftComponent', () => {
  let component: MyTeamWeeklyShiftComponent;
  let fixture: ComponentFixture<MyTeamWeeklyShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamWeeklyShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamWeeklyShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
