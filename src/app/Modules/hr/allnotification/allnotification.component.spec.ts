import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllnotificationComponent } from './allnotification.component';

describe('AllnotificationComponent', () => {
  let component: AllnotificationComponent;
  let fixture: ComponentFixture<AllnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllnotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
