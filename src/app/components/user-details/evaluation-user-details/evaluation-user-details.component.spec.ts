import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationUserDetailsComponent } from './evaluation-user-details.component';

describe('EvaluationUserDetailsComponent', () => {
  let component: EvaluationUserDetailsComponent;
  let fixture: ComponentFixture<EvaluationUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
