import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanConfigurationMasterComponent } from './loan-configuration-master.component';

describe('LoanConfigurationMasterComponent', () => {
  let component: LoanConfigurationMasterComponent;
  let fixture: ComponentFixture<LoanConfigurationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanConfigurationMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanConfigurationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
