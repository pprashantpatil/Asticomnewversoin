import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollTriggerDashComponent } from './payroll-trigger-dash.component';

describe('PayrollTriggerDashComponent', () => {
  let component: PayrollTriggerDashComponent;
  let fixture: ComponentFixture<PayrollTriggerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollTriggerDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollTriggerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
