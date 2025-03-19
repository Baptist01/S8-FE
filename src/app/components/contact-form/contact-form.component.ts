import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-contact-form',
  imports: [
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    RouterLink,
    MatInput,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  naam = '';
  email = '';
  telefoonNummer = '';
  bericht = '';
}
