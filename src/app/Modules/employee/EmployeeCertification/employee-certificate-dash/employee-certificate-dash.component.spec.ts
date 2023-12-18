import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCertificateDashComponent } from './employee-certificate-dash.component';

describe('EmployeeCertificateDashComponent', () => {
  let component: EmployeeCertificateDashComponent;
  let fixture: ComponentFixture<EmployeeCertificateDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCertificateDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCertificateDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
