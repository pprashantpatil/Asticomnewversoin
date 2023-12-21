import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeResignationFormComponent } from './employee-resignation-form.component';

describe('EmployeeResignationFormComponent', () => {
  let component: EmployeeResignationFormComponent;
  let fixture: ComponentFixture<EmployeeResignationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeResignationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeResignationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
