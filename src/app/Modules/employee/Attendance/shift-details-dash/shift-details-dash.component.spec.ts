import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftDetailsDashComponent } from './shift-details-dash.component';

describe('ShiftDetailsDashComponent', () => {
  let component: ShiftDetailsDashComponent;
  let fixture: ComponentFixture<ShiftDetailsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftDetailsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftDetailsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
