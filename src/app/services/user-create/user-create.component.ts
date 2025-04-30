import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-user-create',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})

export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      birthDate: [''],
      work: [''],
      workActivities: [''],
      smoking: [''],
      drinking: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.http.post(environment.api.url + '/users', this.userForm.value)
        .subscribe(response => {
          console.log('User added successfully', response);
          // Handle successful response
        }, error => {
          console.error('Error adding user', error);
          // Handle error response
        });
    }

    this.router.navigate(['/users']);
  }
}