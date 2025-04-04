import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalIssueUserDetailsComponent } from './physical-issue-user-details.component';

describe('PhysicalIssueUserDetailsComponent', () => {
  let component: PhysicalIssueUserDetailsComponent;
  let fixture: ComponentFixture<PhysicalIssueUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalIssueUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalIssueUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
