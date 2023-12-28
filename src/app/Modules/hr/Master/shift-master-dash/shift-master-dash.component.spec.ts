import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftMasterDashComponent } from './shift-master-dash.component';

describe('ShiftMasterDashComponent', () => {
  let component: ShiftMasterDashComponent;
  let fixture: ComponentFixture<ShiftMasterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftMasterDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
