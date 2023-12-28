import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrivelnecemasterdashComponent } from './grivelnecemasterdash.component';

describe('GrivelnecemasterdashComponent', () => {
  let component: GrivelnecemasterdashComponent;
  let fixture: ComponentFixture<GrivelnecemasterdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrivelnecemasterdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrivelnecemasterdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
