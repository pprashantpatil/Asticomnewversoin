import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMasterFormComponent } from './country-master-form.component';

describe('CountryMasterFormComponent', () => {
  let component: CountryMasterFormComponent;
  let fixture: ComponentFixture<CountryMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
