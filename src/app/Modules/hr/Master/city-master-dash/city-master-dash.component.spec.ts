import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityMasterDashComponent } from './city-master-dash.component';

describe('CityMasterDashComponent', () => {
  let component: CityMasterDashComponent;
  let fixture: ComponentFixture<CityMasterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityMasterDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
