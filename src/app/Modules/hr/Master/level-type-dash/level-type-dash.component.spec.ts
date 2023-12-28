import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelTypeDashComponent } from './level-type-dash.component';

describe('LevelTypeDashComponent', () => {
  let component: LevelTypeDashComponent;
  let fixture: ComponentFixture<LevelTypeDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelTypeDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelTypeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
