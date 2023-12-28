import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrivelnecemasterComponent } from './grivelnecemaster.component';

describe('GrivelnecemasterComponent', () => {
  let component: GrivelnecemasterComponent;
  let fixture: ComponentFixture<GrivelnecemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrivelnecemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrivelnecemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
