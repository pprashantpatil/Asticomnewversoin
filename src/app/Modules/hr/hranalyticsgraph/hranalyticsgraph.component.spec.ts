import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HranalyticsgraphComponent } from './hranalyticsgraph.component';

describe('HranalyticsgraphComponent', () => {
  let component: HranalyticsgraphComponent;
  let fixture: ComponentFixture<HranalyticsgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HranalyticsgraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HranalyticsgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
