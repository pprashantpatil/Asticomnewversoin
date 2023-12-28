import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmasterdashComponent } from './departmentmasterdash.component';

describe('DepartmentmasterdashComponent', () => {
  let component: DepartmentmasterdashComponent;
  let fixture: ComponentFixture<DepartmentmasterdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentmasterdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentmasterdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
