import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveUploadComponent } from './leave-upload.component';

describe('LeaveUploadComponent', () => {
  let component: LeaveUploadComponent;
  let fixture: ComponentFixture<LeaveUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
