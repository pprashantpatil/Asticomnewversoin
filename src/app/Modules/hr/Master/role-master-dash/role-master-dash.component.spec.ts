import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMasterDashComponent } from './role-master-dash.component';

describe('RoleMasterDashComponent', () => {
  let component: RoleMasterDashComponent;
  let fixture: ComponentFixture<RoleMasterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMasterDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
