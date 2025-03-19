import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalPersonalTrainingComponent } from './professional-personal-training.component';

describe('ProfessionalPersonalTrainingComponent', () => {
  let component: ProfessionalPersonalTrainingComponent;
  let fixture: ComponentFixture<ProfessionalPersonalTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalPersonalTrainingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalPersonalTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
