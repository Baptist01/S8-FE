import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      birthDate: [''],
      work: [''],
      workActivities: [''],
      smoking: [''],
      drinking: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = { ...this.userForm.value };

      if (!userData.id || userData.id.trim() === '') {
        // POST to /users, exclude 'id'
        delete userData.id;

        this.http
          .post(environment.api.url + '/users', userData, {
            withCredentials: true,
          })
          .subscribe(
            (response) => {
              console.log('User created successfully', response);
              this.router.navigate(['/users']);
            },
            (error) => {
              console.error('Error creating user', error);
            },
          );
      } else {
        this.http
          .post(environment.api.url + '/users/id', userData, {
            withCredentials: true,
          })
          .subscribe(
            (response) => {
              console.log('User updated successfully', response);
              this.router.navigate(['/users']);
            },
            (error) => {
              console.error('Error updating user', error);
            },
          );
      }
    }
  }
}
