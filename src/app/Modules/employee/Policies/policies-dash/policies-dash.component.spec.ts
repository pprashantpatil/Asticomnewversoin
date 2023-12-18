import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesDashComponent } from './policies-dash.component';

describe('PoliciesDashComponent', () => {
  let component: PoliciesDashComponent;
  let fixture: ComponentFixture<PoliciesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
