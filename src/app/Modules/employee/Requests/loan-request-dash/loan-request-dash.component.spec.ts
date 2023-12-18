import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestDashComponent } from './loan-request-dash.component';

describe('LoanRequestDashComponent', () => {
  let component: LoanRequestDashComponent;
  let fixture: ComponentFixture<LoanRequestDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRequestDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRequestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
