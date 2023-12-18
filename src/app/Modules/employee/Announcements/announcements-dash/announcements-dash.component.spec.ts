import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsDashComponent } from './announcements-dash.component';

describe('AnnouncementsDashComponent', () => {
  let component: AnnouncementsDashComponent;
  let fixture: ComponentFixture<AnnouncementsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
