import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCsvfilesComponent } from './generate-csvfiles.component';

describe('GenerateCsvfilesComponent', () => {
  let component: GenerateCsvfilesComponent;
  let fixture: ComponentFixture<GenerateCsvfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCsvfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateCsvfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
