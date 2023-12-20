import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesFormComponent } from './policies-form.component';

describe('PoliciesFormComponent', () => {
  let component: PoliciesFormComponent;
  let fixture: ComponentFixture<PoliciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
