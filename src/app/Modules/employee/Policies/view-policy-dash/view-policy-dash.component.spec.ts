import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolicyDashComponent } from './view-policy-dash.component';

describe('ViewPolicyDashComponent', () => {
  let component: ViewPolicyDashComponent;
  let fixture: ComponentFixture<ViewPolicyDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPolicyDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPolicyDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
