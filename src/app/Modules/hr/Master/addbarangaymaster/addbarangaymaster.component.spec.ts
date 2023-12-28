import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbarangaymasterComponent } from './addbarangaymaster.component';

describe('AddbarangaymasterComponent', () => {
  let component: AddbarangaymasterComponent;
  let fixture: ComponentFixture<AddbarangaymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbarangaymasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbarangaymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
