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
  selector: 'app-membership-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './membership-user-details.component.html',
  styleUrl: './membership-user-details.component.css',
})
export class MembershipUserDetailsComponent {
  @Input() userId: string = '';
  @Input() memberships: any[] = [];
  @Output() membershipUpdated = new EventEmitter<any>();
  showAddMembershipForm = false;
  membershipForm: FormGroup;
  editingMembershipIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.membershipForm = this.fb.group({
      userId: [''],
      isCurrent: [false],
      fee: ['', Validators.required],
      trainingTypeId: [''],
      frequencyId: [''],
      startDate: ['', Validators.required],
    });
  }

  onAddMembership(): void {
    this.membershipForm.value.userId = this.userId;
    if (this.membershipForm.valid) {
      const newMembership = this.membershipForm.value;
      this.http
        .post(environment.api.url + '/users/membership/', newMembership)
        .subscribe();
      this.memberships.push(newMembership);
      this.showAddMembershipForm = false;
      this.membershipForm.reset();
    }
  }

  onEditMembership(index: number): void {
    this.editingMembershipIndex = index;
    const membership = this.memberships[index];
    this.membershipForm.patchValue(membership); // Populate the form with the selected membership data
  }

  onUpdateMembership(): void {
    if (this.membershipForm.valid && this.editingMembershipIndex !== null) {
      const updatedMembership = this.membershipForm.value;
      const membershipId = this.memberships[this.editingMembershipIndex].id; // Assuming each membership has an `id`

      this.http
        .put(
          environment.api.url + `/users/membership/${membershipId}`,
          updatedMembership,
        )
        .subscribe(() => {
          // Update the local user object
          if (this.editingMembershipIndex !== null) {
            this.memberships[this.editingMembershipIndex] = updatedMembership;
          }
          this.editingMembershipIndex = null; // Exit editing mode
          this.membershipForm.reset();
        });
    }
  }

  cancelEditMembership(): void {
    this.editingMembershipIndex = null;
    this.membershipForm.reset();
  }

  onDeleteMembership(index: number): void {
    const membershipId = this.memberships[index].id;
    this.http
      .delete(environment.api.url + `/users/membership/${membershipId}`)
      .subscribe(() => {
        this.memberships.splice(index, 1);
      });
    this.editingMembershipIndex = null;
    this.membershipForm.reset();
  }
}
