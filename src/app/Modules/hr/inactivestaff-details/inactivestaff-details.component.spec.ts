import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivestaffDetailsComponent } from './inactivestaff-details.component';

describe('InactivestaffDetailsComponent', () => {
  let component: InactivestaffDetailsComponent;
  let fixture: ComponentFixture<InactivestaffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactivestaffDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivestaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
