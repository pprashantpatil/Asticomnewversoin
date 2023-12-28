import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniminisdashComponent } from './deniminisdash.component';

describe('DeniminisdashComponent', () => {
  let component: DeniminisdashComponent;
  let fixture: ComponentFixture<DeniminisdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeniminisdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeniminisdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
