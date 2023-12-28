import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMasterDashComponent } from './country-master-dash.component';

describe('CountryMasterDashComponent', () => {
  let component: CountryMasterDashComponent;
  let fixture: ComponentFixture<CountryMasterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryMasterDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
