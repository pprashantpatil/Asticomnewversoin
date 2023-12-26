import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePreliminaryReportComponent } from './generate-preliminary-report.component';

describe('GeneratePreliminaryReportComponent', () => {
  let component: GeneratePreliminaryReportComponent;
  let fixture: ComponentFixture<GeneratePreliminaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePreliminaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePreliminaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
