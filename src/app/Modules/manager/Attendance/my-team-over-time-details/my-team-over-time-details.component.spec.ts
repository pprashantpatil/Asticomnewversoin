import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamOverTimeDetailsComponent } from './my-team-over-time-details.component';

describe('MyTeamOverTimeDetailsComponent', () => {
  let component: MyTeamOverTimeDetailsComponent;
  let fixture: ComponentFixture<MyTeamOverTimeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeamOverTimeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamOverTimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
