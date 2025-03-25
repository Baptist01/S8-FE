import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})

export class UserCreateComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      work: [''],
      workActivities: [''],
      smoking: [''],
      drinking: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.http.post('http://localhost:5003/api/users', this.userForm.value)
        .subscribe(response => {
          console.log('User added successfully', response);
          // Handle successful response
        }, error => {
          console.error('Error adding user', error);
          // Handle error response
        });
    }
  }
}