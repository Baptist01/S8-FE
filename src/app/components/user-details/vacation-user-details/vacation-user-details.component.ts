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
  selector: 'app-vacation-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './vacation-user-details.component.html',
  styleUrl: './vacation-user-details.component.css',
})
export class VacationUserDetailsComponent {
  @Input() userId: number | null = null;
  @Input() vacations: any[] = [];
  @Output() vacationsUpdated = new EventEmitter<any[]>();
  showAddVacationForm = false;
  vacationForm: FormGroup;
  editingVacationIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.vacationForm = this.fb.group({
      notRelevant: [Boolean],
      userId: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
    });
  }

  onAddVacation(): void {
    this.vacationForm.value.userId = this.userId;
    if (this.vacationForm.valid) {
      if (this.vacationForm.value.notRelevant) {
        this.vacationForm.patchValue({
          userId: this.userId,
          startDate: '1999-01-01',
          endDate: '1999-01-01',
          description: 'No vacation',
        });
        this.http
          .post(environment.api.url + '/users/vacation/', this.vacationForm.value)
          .subscribe();
        this.vacations.push(this.vacationForm.value);
        this.showAddVacationForm = false;
        this.vacationForm.reset();
      } else {
        const newVacation = this.vacationForm.value;
        this.http
          .post(environment.api.url + '/users/vacation/', newVacation)
          .subscribe();
        this.vacations.push(newVacation);
        this.showAddVacationForm = false;
        this.vacationForm.reset();
      }
    }
  }

  onEditVacation(index: number): void {
    this.editingVacationIndex = index;
    const vacation = this.vacations[index];
    this.vacationForm.patchValue(vacation); // Populate the form with the selected vacation data
  }

  onUpdateVacation(): void {
    if (this.vacationForm.valid && this.editingVacationIndex !== null) {
      const updatedVacation = this.vacationForm.value;
      const vacationId = this.vacations[this.editingVacationIndex].id; // Assuming each vacation has an `id`

      this.http
        .put(
          environment.api.url + `/users/vacation/${vacationId}`,
          updatedVacation,
        )
        .subscribe(() => {
          // Update the local user object
          if (this.editingVacationIndex !== null) {
            this.vacations[this.editingVacationIndex] = updatedVacation;
          }
          this.editingVacationIndex = null; // Exit editing mode
          this.vacationForm.reset();
        });
    }
  }

  cancelEditVacation(): void {
    this.editingVacationIndex = null;
    this.vacationForm.reset();
  }

  onDeleteVacation(index: number): void {
    const vacationId = this.vacations[index].id;
    this.http
      .delete(environment.api.url + `/users/vacation/${vacationId}`)
      .subscribe(() => {
        this.vacations.splice(index, 1);
      });
    this.editingVacationIndex = null;
    this.vacationForm.reset();
  }
}
