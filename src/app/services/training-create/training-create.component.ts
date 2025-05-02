import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/enviroment/enviroment';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

interface TrainingResponse {
  id: string;
  name: string;
  description: string;
  type: string;
  start_time: string;
  end_time: string;
  date: string;
  location: string;
}

@Component({
  selector: 'app-training-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './training-create.component.html',
  styleUrl: './training-create.component.css',
})
export class TrainingCreateComponent implements OnInit {
  trainingForm: FormGroup;
  users: any[] = [];
  selectedParticipants: string[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.trainingForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      date: ['', Validators.required],
      location: [''],
      max_participants: [0, Validators.required],
      trainer: [[], Validators.required],
      sporters: [[]],
    });
  }

  ngOnInit(): void {
    this.http.get(environment.api.url + '/users').subscribe(
      (response: any) => {
        this.users = response;
        this.filteredUsers = response;
      },
      (error) => {
        console.error('Error fetching users', error);
      },
    );
  }

  toggleParticipant(userId: string): void {
    console.log('Checkbox clicked:', userId);

    const index = this.selectedParticipants.indexOf(userId);
    if (index > -1) {
      this.selectedParticipants.splice(index, 1);
    } else {
      this.selectedParticipants.push(userId);
    }

    this.trainingForm.get('sporters')?.setValue(this.selectedParticipants);
    console.log(this.trainingForm.value.sporters);
    console.log(this.selectedParticipants);
  }

  filterUsers(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
    );
  }

  async onSubmit(): Promise<void> {
    if (this.trainingForm.valid) {
      await this.http
        .post<TrainingResponse>(
          environment.api.url + '/trainings',
          this.trainingForm.value,
        )
        .subscribe(
          (response) => {
            const trainingId = response.id;;

            // Add participants (sporters)
            this.trainingForm.value.sporters.forEach((userId: string) => {
              const payload = {
                trainingId: trainingId,
                userId: userId,
                roleId: 1, // Role ID for participants
              };
              this.http
                .post(environment.api.url + '/trainings/addUser', payload)
                .subscribe(
                  (addUserResponse) => {
                    console.log(
                      'User added to training successfully',
                      addUserResponse,
                    );
                  },
                  (addUserError) => {
                    console.error(
                      'Error adding user to training',
                      addUserError,
                    );
                  },
                );
            });

            const trainerId = this.trainingForm.value.trainer;
            console.log('Trainer ID:', trainerId);
            console.log('Training ID:', trainingId);
            if (trainerId) {
              const payload = {
                trainingId: trainingId,
                userId: trainerId,
                roleId: 2,
              };
              this.http
                .post(environment.api.url + '/trainings/addUser', payload)
                .subscribe(
                  (addTrainerResponse) => {
                    console.log(
                      'Trainer added to training successfully',
                      addTrainerResponse,
                    );
                  },
                  (addTrainerError) => {
                    console.error(
                      'Error adding trainer to training',
                      addTrainerError,
                    );
                  },
                );
            }
            this.router.navigate(['/agenda']);

          },
          (error) => {
            console.error('Error adding training', error);
          },
        );
    }
    await delay(1000);
  }

  get trainingTypes(): string[] {
    return ['Personal training', 'Group training'];
  }

  get timeOptions(): string[] {
    return [
      '06:00:00',
      '06:30:00',
      '07:00:00',
      '07:30:00',
      '08:00:00',
      '08:30:00',
      '09:00:00',
      '09:30:00',
      '10:00:00',
      '10:30:00',
      '11:00:00',
      '11:30:00',
      '12:00:00',
      '12:30:00',
      '13:00:00',
      '13:30:00',
      '14:00:00',
      '14:30:00',
      '15:00:00',
      '15:30:00',
      '16:00:00',
      '16:30:00',
      '17:00:00',
      '17:30:00',
      '18:00:00',
      '18:30:00',
      '19:00:00',
      '19:30:00',
      '20:00:00',
      '20:30:00',
      '21:00:00',
      '21:30:00',
      '22:00:00',
      '22:30:00',
      '23:00:00',
      '23:30:00',
    ];
  }
}
