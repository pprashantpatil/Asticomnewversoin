import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniminisaddComponent } from './deniminisadd.component';

describe('DeniminisaddComponent', () => {
  let component: DeniminisaddComponent;
  let fixture: ComponentFixture<DeniminisaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeniminisaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeniminisaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
