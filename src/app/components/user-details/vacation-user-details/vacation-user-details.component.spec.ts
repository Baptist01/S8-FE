import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationUserDetailsComponent } from './vacation-user-details.component';

describe('VacationUserDetailsComponent', () => {
  let component: VacationUserDetailsComponent;
  let fixture: ComponentFixture<VacationUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacationUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
