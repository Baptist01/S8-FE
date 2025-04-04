import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipUserDetailsComponent } from './membership-user-details.component';

describe('MembershipUserDetailsComponent', () => {
  let component: MembershipUserDetailsComponent;
  let fixture: ComponentFixture<MembershipUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
