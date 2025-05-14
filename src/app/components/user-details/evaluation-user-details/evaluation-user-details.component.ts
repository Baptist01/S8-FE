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
  selector: 'app-evaluation-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './evaluation-user-details.component.html',
  styleUrl: './evaluation-user-details.component.css',
})
export class EvaluationUserDetailsComponent {
  @Input() userId: string | null = null;
  @Input() evaluations: any[] = [];
  @Output() evaluationsUpdated = new EventEmitter<any[]>();
  showAddEvaluationForm = false;
  evaluationForm: FormGroup;
  editingEvaluationIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.evaluationForm = this.fb.group({
      userId: [''],
      date: ['', Validators.required],
      progress: ['', Validators.required],
      description: [''],
      payment: ['', Validators.required],
      comment: [''],
    });
  }

  onAddEvaluation(): void {
    this.evaluationForm.value.userId = this.userId;
    if (this.evaluationForm.valid) {
      const newEvaluation = this.evaluationForm.value;
      this.http
        .post(environment.api.url + '/users/evaluation/', newEvaluation, {
        withCredentials: true,
      })
        .subscribe();
      this.evaluations.push(newEvaluation);
      this.showAddEvaluationForm = false;
      this.evaluationForm.reset();
    }
  }

  onEditEvaluation(index: number): void {
    this.editingEvaluationIndex = index;
    const evaluation = this.evaluations[index];
    this.evaluationForm.patchValue(evaluation); // Populate the form with the selected evaluation data
  }

  onUpdateEvaluation(): void {
    if (this.evaluationForm.valid && this.editingEvaluationIndex !== null) {
      const updatedEvaluation = this.evaluationForm.value;
      const evaluationId = this.evaluations[this.editingEvaluationIndex].id; // Assuming each evaluation has an `id`

      this.http
        .put(
          environment.api.url + `/users/evaluation/${evaluationId}`,
          updatedEvaluation,
          {
            withCredentials: true,
          }
        )
        .subscribe(() => {
          if (this.editingEvaluationIndex !== null) {
            this.evaluations[this.editingEvaluationIndex] = updatedEvaluation;
          }
          this.editingEvaluationIndex = null;
          this.evaluationForm.reset();
        });
    }
  }

  cancelEditEvaluation(): void {
    this.editingEvaluationIndex = null;
    this.evaluationForm.reset();
  }

  onDeleteEvaluation(index: number): void {
    const evaluationId = this.evaluations[index].id;
    this.http
      .delete(environment.api.url + `/users/evaluation/${evaluationId}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.evaluations.splice(index, 1);
      });
    this.editingEvaluationIndex = null;
    this.evaluationForm.reset();
  }
}
