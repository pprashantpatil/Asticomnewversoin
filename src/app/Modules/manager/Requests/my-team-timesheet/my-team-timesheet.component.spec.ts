import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamTimesheetComponent } from './my-team-timesheet.component';

describe('MyTeamTimesheetComponent', () => {
  let component: MyTeamTimesheetComponent;
  let fixture: ComponentFixture<MyTeamTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamTimesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
