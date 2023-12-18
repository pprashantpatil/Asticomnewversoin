import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeResignationDashComponent } from './employee-resignation-dash.component';

describe('EmployeeResignationDashComponent', () => {
  let component: EmployeeResignationDashComponent;
  let fixture: ComponentFixture<EmployeeResignationDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeResignationDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeResignationDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
