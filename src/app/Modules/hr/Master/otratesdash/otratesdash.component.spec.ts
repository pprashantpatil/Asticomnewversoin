import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtratesdashComponent } from './otratesdash.component';

describe('OtratesdashComponent', () => {
  let component: OtratesdashComponent;
  let fixture: ComponentFixture<OtratesdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtratesdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtratesdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
