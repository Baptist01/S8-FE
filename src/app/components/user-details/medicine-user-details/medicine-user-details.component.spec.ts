import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineUserDetailsComponent } from './medicine-user-details.component';

describe('MedicineUserDetailsComponent', () => {
  let component: MedicineUserDetailsComponent;
  let fixture: ComponentFixture<MedicineUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
