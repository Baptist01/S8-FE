import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

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
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrl: './training-edit.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatTableModule],
})
export class TrainingEditComponent implements OnInit {
  users: any[] = [];
  selectedParticipants: any[] = [];
  selectedTrainer: any = null;
  filteredUsers: any[] = [];
  searchQuery: string = '';
  trainingForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    type: new FormControl('', Validators.required),
    start_time: new FormControl('', Validators.required),
    end_time: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    max_participants: new FormControl('', Validators.required),
    trainer: new FormControl({}, Validators.required),
    sporters: new FormControl<string[]>([]),
  });
  originalFormValue: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const trainingId = this.route.snapshot.paramMap.get('id');
    if (trainingId) {
      this.http
        .get(`${environment.api.url}/trainings/${trainingId}`)
        .subscribe((training: any) => {
          this.trainingForm.patchValue(training);
          this.trainingForm.value.id = training.id;
          this.trainingForm.value.name = training.name;
          this.trainingForm.value.description = training.description;
          this.trainingForm.value.type = training.type;
          this.trainingForm.value.start_time = training.start_time;
          this.trainingForm.value.end_time = training.end_time;
          this.trainingForm.value.date = training.date;
          this.trainingForm.value.location = training.location;
          this.trainingForm.value.max_participants = training.max_participants;
          this.trainingForm.value.trainer = training.users.find((user: any) => user.roleId === 2)?.userId;

          this.trainingForm.value.trainer = training.users.find(
            (user: any) => user.roleId === 2,
          );
          const beginValue: string[] = [];
          training.users.forEach((user: any) => {
            if (user.roleId === 1) {
              this.selectedParticipants.push(user.userId);
              this.trainingForm.value.sporters?.push(user);
              beginValue.push(user.userId);
            }
          }),
            (this.selectedTrainer = this.trainingForm.value.trainer || []);

          this.originalFormValue = {
            ...this.trainingForm.value,
            sporters: beginValue,
            trainer: this.selectedTrainer.userId || null,
          };
        });
    }

    this.http.get(`${environment.api.url}/users`).subscribe((users: any) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  toggleParticipant(userId: string): void {
    const index = this.selectedParticipants.indexOf(userId);
    if (index > -1) {
      this.selectedParticipants.splice(index, 1);
    } else {
      this.selectedParticipants.push(userId);
    }
    this.trainingForm.get('sporters')?.setValue(this.selectedParticipants);

    console.log(this.trainingForm.value.sporters);
  }

  filterUsers(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query),
    );
  }

  onSubmit(): void {
    if (this.trainingForm.valid) {
      const currentFormValue: any = this.trainingForm.value;
      const trainingId = this.originalFormValue.id;

      console.log('Current form value:', currentFormValue);

      const requestBody = {
        id: currentFormValue.id,
        name: currentFormValue.name,
        description: currentFormValue.description,
        type: currentFormValue.type,
        start_time: currentFormValue.start_time,
        end_time: currentFormValue.end_time,
        date: currentFormValue.date,
        location: currentFormValue.location,
        max_participants: currentFormValue.max_participants,
        trainer: {
          trainingId: currentFormValue.id,
          userId: currentFormValue.trainer.userId,
          roleId: 2,
        },
        sporter: this.selectedParticipants.map((userId: string) => ({
          trainingId: currentFormValue.id,
          userId,
          roleId: 1,
        })),
      };

      this.http
        .put<TrainingResponse>(
          environment.api.url + '/trainings/editTraining',
          requestBody,
        )
        .subscribe(() => {}, console.error);

      this.router.navigate(['/agenda']);
    }
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
