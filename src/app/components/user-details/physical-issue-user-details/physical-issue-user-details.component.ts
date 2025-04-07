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
  selector: 'app-physical-issue-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './physical-issue-user-details.component.html',
  styleUrl: './physical-issue-user-details.component.css',
})
export class PhysicalIssueUserDetailsComponent {
  @Input() phisicalIssues: any[] = [];
  @Input() userId: string = '';
  @Output() physicalIssueUpdated = new EventEmitter<any>();
  showAddPhysicalIssueForm = false;
  physicalIssueForm: FormGroup;
  editingPhysicalIssueIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.physicalIssueForm = this.fb.group({
      notRelevant: [Boolean],
      userId: [''],
      name: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  onAddPhysicalIssue(): void {
    this.physicalIssueForm.value.userId = this.userId;
    if (this.physicalIssueForm.valid) {
      if (this.physicalIssueForm.value.notRelevant) {
        this.physicalIssueForm.patchValue({
          userId: this.userId,
          name: 'No issue',
          description: 'Not Relevant',
          startDate: '1999-01-01',
          endDate: '1999-01-01',
        });
        this.http
        .post(environment.api.url + `/users/physicalissue/`, this.physicalIssueForm.value)
        .subscribe();
      this.phisicalIssues.push(this.physicalIssueForm.value);
      this.showAddPhysicalIssueForm = false;
      this.physicalIssueForm.reset();
      } else {
        const newPhysicalIssue = this.physicalIssueForm.value;
        this.http
        .post(environment.api.url + `/users/physicalissue/`, newPhysicalIssue)
        .subscribe();
      this.phisicalIssues.push(newPhysicalIssue);
      this.showAddPhysicalIssueForm = false;
      this.physicalIssueForm.reset();
      }
    }
  }

  onEditPhysicalIssue(index: number): void {
    this.editingPhysicalIssueIndex = index;
    const issue = this.phisicalIssues[index];
    this.physicalIssueForm.patchValue(issue);
  }

  onUpdatePhysicalIssue(): void {
    if (
      this.physicalIssueForm.valid &&
      this.editingPhysicalIssueIndex !== null
    ) {
      const updatedIssue = this.physicalIssueForm.value;
      const issueId = this.phisicalIssues[this.editingPhysicalIssueIndex].id; // Assuming each issue has an `id`

      this.http
        .put(
          environment.api.url + `/users/physicalissue/${issueId}`,
          updatedIssue,
        )
        .subscribe(() => {
          // Update the local user object
          if (this.editingPhysicalIssueIndex !== null) {
            this.phisicalIssues[this.editingPhysicalIssueIndex] = updatedIssue;
          }
          this.editingPhysicalIssueIndex = null; // Exit editing mode
          this.physicalIssueForm.reset();
        });
    }
  }

  cancelEditPhysicalIssue(): void {
    this.editingPhysicalIssueIndex = null;
    this.physicalIssueForm.reset();
  }

  onDeletePhysicalIssue(index: number): void {
    const issueId = this.phisicalIssues[index].id;

    this.http
      .delete(environment.api.url + `/users/physicalissue/${issueId}`)
      .subscribe(() => {
        this.phisicalIssues.splice(index, 1);
      });
    this.editingPhysicalIssueIndex = null;
    this.physicalIssueForm.reset();
  }
}
