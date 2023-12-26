import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigurationdashComponent } from './leave-configurationdash.component';

describe('LeaveConfigurationdashComponent', () => {
  let component: LeaveConfigurationdashComponent;
  let fixture: ComponentFixture<LeaveConfigurationdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveConfigurationdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveConfigurationdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
