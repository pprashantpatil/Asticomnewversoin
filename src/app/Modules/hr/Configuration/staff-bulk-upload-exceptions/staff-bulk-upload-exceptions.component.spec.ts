import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBulkUploadExceptionsComponent } from './staff-bulk-upload-exceptions.component';

describe('StaffBulkUploadExceptionsComponent', () => {
  let component: StaffBulkUploadExceptionsComponent;
  let fixture: ComponentFixture<StaffBulkUploadExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffBulkUploadExceptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffBulkUploadExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
