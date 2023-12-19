import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeaveRequestComponent } from './new-leave-request.component';

describe('NewLeaveRequestComponent', () => {
  let component: NewLeaveRequestComponent;
  let fixture: ComponentFixture<NewLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLeaveRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
