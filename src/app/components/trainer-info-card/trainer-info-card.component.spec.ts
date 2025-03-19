import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerInfoCardComponent } from './trainer-info-card.component';

describe('TrainerInfoCardComponent', () => {
  let component: TrainerInfoCardComponent;
  let fixture: ComponentFixture<TrainerInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
