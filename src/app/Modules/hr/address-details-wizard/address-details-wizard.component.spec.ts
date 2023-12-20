import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetailsWizardComponent } from './address-details-wizard.component';

describe('AddressDetailsWizardComponent', () => {
  let component: AddressDetailsWizardComponent;
  let fixture: ComponentFixture<AddressDetailsWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressDetailsWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressDetailsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
