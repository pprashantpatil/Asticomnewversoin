import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanConfigurationDashComponent } from './loan-configuration-dash.component';

describe('LoanConfigurationDashComponent', () => {
  let component: LoanConfigurationDashComponent;
  let fixture: ComponentFixture<LoanConfigurationDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanConfigurationDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanConfigurationDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
