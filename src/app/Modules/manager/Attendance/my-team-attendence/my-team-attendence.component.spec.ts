import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamAttendenceComponent } from './my-team-attendence.component';

describe('MyTeamAttendenceComponent', () => {
  let component: MyTeamAttendenceComponent;
  let fixture: ComponentFixture<MyTeamAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamAttendenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
