import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUserDetailsComponent } from './base-user-details.component';

describe('BaseUserDetailsComponent', () => {
  let component: BaseUserDetailsComponent;
  let fixture: ComponentFixture<BaseUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
