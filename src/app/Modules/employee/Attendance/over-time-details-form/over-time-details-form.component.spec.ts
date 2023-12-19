import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeDetailsFormComponent } from './over-time-details-form.component';

describe('OverTimeDetailsFormComponent', () => {
  let component: OverTimeDetailsFormComponent;
  let fixture: ComponentFixture<OverTimeDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverTimeDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverTimeDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
