import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmasteraddComponent } from './departmentmasteradd.component';

describe('DepartmentmasteraddComponent', () => {
  let component: DepartmentmasteraddComponent;
  let fixture: ComponentFixture<DepartmentmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
