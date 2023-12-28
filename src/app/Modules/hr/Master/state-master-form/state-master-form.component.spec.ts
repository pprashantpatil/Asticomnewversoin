import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMasterFormComponent } from './state-master-form.component';

describe('StateMasterFormComponent', () => {
  let component: StateMasterFormComponent;
  let fixture: ComponentFixture<StateMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
