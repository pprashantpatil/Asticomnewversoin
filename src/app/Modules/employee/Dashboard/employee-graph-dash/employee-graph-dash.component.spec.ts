import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGraphDashComponent } from './employee-graph-dash.component';

describe('EmployeeGraphDashComponent', () => {
  let component: EmployeeGraphDashComponent;
  let fixture: ComponentFixture<EmployeeGraphDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGraphDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeGraphDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
