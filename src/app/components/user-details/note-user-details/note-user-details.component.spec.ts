import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteUserDetailsComponent } from './note-user-details.component';

describe('NoteUserDetailsComponent', () => {
  let component: NoteUserDetailsComponent;
  let fixture: ComponentFixture<NoteUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
