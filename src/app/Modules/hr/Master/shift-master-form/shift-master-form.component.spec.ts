import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftMasterFormComponent } from './shift-master-form.component';

describe('ShiftMasterFormComponent', () => {
  let component: ShiftMasterFormComponent;
  let fixture: ComponentFixture<ShiftMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
