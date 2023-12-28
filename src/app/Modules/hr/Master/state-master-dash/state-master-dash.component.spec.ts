import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMasterDashComponent } from './state-master-dash.component';

describe('StateMasterDashComponent', () => {
  let component: StateMasterDashComponent;
  let fixture: ComponentFixture<StateMasterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateMasterDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
