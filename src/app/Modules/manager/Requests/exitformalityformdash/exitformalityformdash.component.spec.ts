import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitformalityformdashComponent } from './exitformalityformdash.component';

describe('ExitformalityformdashComponent', () => {
  let component: ExitformalityformdashComponent;
  let fixture: ComponentFixture<ExitformalityformdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitformalityformdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitformalityformdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
