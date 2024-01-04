import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGraphDashComponent } from './hr-graph-dash.component';

describe('HrGraphDashComponent', () => {
  let component: HrGraphDashComponent;
  let fixture: ComponentFixture<HrGraphDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrGraphDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrGraphDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
