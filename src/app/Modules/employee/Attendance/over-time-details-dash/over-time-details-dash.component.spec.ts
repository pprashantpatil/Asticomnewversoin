import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeDetailsDashComponent } from './over-time-details-dash.component';

describe('OverTimeDetailsDashComponent', () => {
  let component: OverTimeDetailsDashComponent;
  let fixture: ComponentFixture<OverTimeDetailsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverTimeDetailsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverTimeDetailsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
