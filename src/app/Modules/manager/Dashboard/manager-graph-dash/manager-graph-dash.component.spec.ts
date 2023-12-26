import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGraphDashComponent } from './manager-graph-dash.component';

describe('ManagerGraphDashComponent', () => {
  let component: ManagerGraphDashComponent;
  let fixture: ComponentFixture<ManagerGraphDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerGraphDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerGraphDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
