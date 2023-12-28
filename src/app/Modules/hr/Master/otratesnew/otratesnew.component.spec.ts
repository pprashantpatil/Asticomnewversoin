import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtratesnewComponent } from './otratesnew.component';

describe('OtratesnewComponent', () => {
  let component: OtratesnewComponent;
  let fixture: ComponentFixture<OtratesnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtratesnewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtratesnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
