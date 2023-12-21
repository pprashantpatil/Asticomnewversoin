import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamLeaveDetailsComponent } from './my-team-leave-details.component';

describe('MyTeamLeaveDetailsComponent', () => {
  let component: MyTeamLeaveDetailsComponent;
  let fixture: ComponentFixture<MyTeamLeaveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamLeaveDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamLeaveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
