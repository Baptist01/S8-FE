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
  selector: 'app-base-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './base-user-details.component.html',
  styleUrl: './base-user-details.component.css',
})
export class BaseUserDetailsComponent {
  @Input() user: any = null;
  @Output() userUpdated = new EventEmitter<any>();
  editingUserIndex: number | null = null;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      birthDate: ['', Validators.required],
      work: [''],
      workActivity: [''],
      smoking: [''],
      drinking: [''],
      completeProfile: ['']
    });
  }
  onEditUser(): void {
    this.editingUserIndex = 0;
    this.userForm.patchValue(this.user);
  }

  onUpdateUser(): void {
    if (this.userForm.valid && this.editingUserIndex !== null) {
      const updatedUser = this.userForm.value;

      this.http
        .put(environment.api.url + `/users/${this.user.id}`, updatedUser, {
        withCredentials: true,
      })
        .subscribe(() => {
          if (this.editingUserIndex !== null) {
            this.user[this.editingUserIndex] = updatedUser;
          }
          this.editingUserIndex = null;
          this.userForm.reset();
          this.user = updatedUser;
        });
    }
  }

  onCancelEditUser(): void {
    this.editingUserIndex = null;
    this.userForm.reset();
  }
}
