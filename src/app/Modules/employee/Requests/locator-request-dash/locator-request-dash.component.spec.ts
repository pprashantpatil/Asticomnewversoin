import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorRequestDashComponent } from './locator-request-dash.component';

describe('LocatorRequestDashComponent', () => {
  let component: LocatorRequestDashComponent;
  let fixture: ComponentFixture<LocatorRequestDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorRequestDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocatorRequestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
