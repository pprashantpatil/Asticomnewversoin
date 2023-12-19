import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftDetailsFormComponent } from './shift-details-form.component';

describe('ShiftDetailsFormComponent', () => {
  let component: ShiftDetailsFormComponent;
  let fixture: ComponentFixture<ShiftDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
