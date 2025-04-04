import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresUserDetailsComponent } from './adres-user-details.component';

describe('AdresUserDetailsComponent', () => {
  let component: AdresUserDetailsComponent;
  let fixture: ComponentFixture<AdresUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
