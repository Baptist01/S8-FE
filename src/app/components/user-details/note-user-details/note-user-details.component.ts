import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-note-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './note-user-details.component.html',
  styleUrl: './note-user-details.component.css',
})
export class NoteUserDetailsComponent {
  @Input() userId: string | null = null;
  @Input() notes: any[] = [];
  @Output() notesUpdated = new EventEmitter<any[]>();
  showAddNoteForm = false;
  noteForm: FormGroup;
  editingNoteIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.noteForm = this.fb.group({
      userId: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onAddNote(): void {
    this.noteForm.value.userId = this.userId;
    if (this.noteForm.valid) {
      const newNote = this.noteForm.value;
      this.http
        .post(environment.api.url + '/users/note/', newNote, {
          withCredentials: true,
        })
        .subscribe();
      this.notes.push(newNote);
      this.showAddNoteForm = false;
      this.noteForm.reset();
    }
  }

  onEditNote(index: number): void {
    this.editingNoteIndex = index;
    const note = this.notes[index];
    this.noteForm.patchValue(note); // Populate the form with the selected note data
  }

  onUpdateNote(): void {
    if (this.noteForm.valid && this.editingNoteIndex !== null) {
      const updatedNote = this.noteForm.value;
      const noteId = this.notes[this.editingNoteIndex].id;

      this.http
        .put(environment.api.url + `/users/note/${noteId}`, updatedNote, {
          withCredentials: true,
        })
        .subscribe(() => {
          // Update the local user object
          if (this.editingNoteIndex !== null) {
            this.notes[this.editingNoteIndex] = updatedNote;
          }
          this.editingNoteIndex = null; // Exit editing mode
          this.noteForm.reset();
        });
    }
  }

  cancelEditNote(): void {
    this.editingNoteIndex = null;
    this.noteForm.reset();
  }

  onDeleteNote(index: number): void {
    const noteId = this.notes[index].id;
    this.http
      .delete(environment.api.url + `/users/note/${noteId}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.notes.splice(index, 1);
      });
    this.editingNoteIndex = null;
    this.noteForm.reset();
  }
}
