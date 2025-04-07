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
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-working-hours-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './working-hours-user-details.component.html',
  styleUrl: './working-hours-user-details.component.css',
})
export class WorkingHoursUserDetailsComponent {
  @Input() userId: string | null = null;
  @Input() workingHours: any[] = [];
  @Output() workingHoursUpdated = new EventEmitter<any[]>();
  showAddWorkingHoursForm = false;
  workingHoursForm: FormGroup;
  editingWorkingHoursIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.workingHoursForm = this.fb.group({
      userId: [''],
      dayOfWeek: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }
  onEditWorkingHours(index: number): void {
    this.editingWorkingHoursIndex = index;
    const workingHour = this.workingHours[index];
    this.workingHoursForm.patchValue(workingHour);
  }

  onUpdateWorkingHours(): void {
    if (this.workingHoursForm.valid && this.editingWorkingHoursIndex !== null) {
      const updatedWorkingHour = this.workingHoursForm.value;
      const workingHourId = this.workingHours[this.editingWorkingHoursIndex].id;

      this.http
        .put(
          environment.api.url + `/users/workhour/${workingHourId}`,
          updatedWorkingHour,
        )
        .subscribe(() => {
          if (this.editingWorkingHoursIndex !== null) {
            this.workingHours[this.editingWorkingHoursIndex] =
              updatedWorkingHour;
          }
          this.editingWorkingHoursIndex = null;
          this.workingHoursForm.reset();
        });
    }
  }

  cancelEditWorkingHours(): void {
    this.editingWorkingHoursIndex = null;
    this.workingHoursForm.reset();
  }

  onDeleteWorkingHours(index: number): void {
    const workingHourId = this.workingHours[index].id;
    this.http
      .delete(environment.api.url + `/users/workhour/${workingHourId}`)
      .subscribe(() => {
        this.workingHours.splice(index, 1);
      });
    this.editingWorkingHoursIndex = null;
    this.workingHoursForm.reset();
  }
  onAddWorkingHours(): void {
    this.workingHoursForm.value.userId = this.userId;
    if (this.workingHoursForm.valid) {
      const newWorking = this.workingHoursForm.value;
      this.http
        .post(environment.api.url + '/users/workhour/', newWorking)
        .subscribe();
      this.workingHours.push(newWorking);
      this.showAddWorkingHoursForm = false;
      this.workingHoursForm.reset();
    }
  }
  getDayOfWeek(day: number): string {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return days[day - 1];
  }
}
