import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysDashComponent } from './holidays-dash.component';

describe('HolidaysDashComponent', () => {
  let component: HolidaysDashComponent;
  let fixture: ComponentFixture<HolidaysDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidaysDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
