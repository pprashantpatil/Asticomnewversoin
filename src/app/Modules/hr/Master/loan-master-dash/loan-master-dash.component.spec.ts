import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanMasterDashComponent } from './loan-master-dash.component';

describe('LoanMasterDashComponent', () => {
  let component: LoanMasterDashComponent;
  let fixture: ComponentFixture<LoanMasterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanMasterDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
