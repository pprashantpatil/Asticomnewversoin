import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonalertpageComponent } from './commonalertpage.component';

describe('CommonalertpageComponent', () => {
  let component: CommonalertpageComponent;
  let fixture: ComponentFixture<CommonalertpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonalertpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonalertpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
