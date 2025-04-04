import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursUserDetailsComponent } from './working-hours-user-details.component';

describe('WorkingHoursUserDetailsComponent', () => {
  let component: WorkingHoursUserDetailsComponent;
  let fixture: ComponentFixture<WorkingHoursUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingHoursUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingHoursUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
