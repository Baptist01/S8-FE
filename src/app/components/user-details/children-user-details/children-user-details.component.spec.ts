import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenUserDetailsComponent } from './children-user-details.component';

describe('ChildrenUserDetailsComponent', () => {
  let component: ChildrenUserDetailsComponent;
  let fixture: ComponentFixture<ChildrenUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildrenUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
