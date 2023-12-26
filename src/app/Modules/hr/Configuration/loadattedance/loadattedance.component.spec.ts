import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadattedanceComponent } from './loadattedance.component';

describe('LoadattedanceComponent', () => {
  let component: LoadattedanceComponent;
  let fixture: ComponentFixture<LoadattedanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadattedanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadattedanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
