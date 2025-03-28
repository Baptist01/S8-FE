import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-user-details-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-details-component.component.html',
  styleUrl: './user-details-component.component.css'
})

export class UserDetailsComponent implements OnInit {
  id: string | null = null;
  user: any = {};
  showAddChildForm = false;
  showAddWorkingHoursForm = false;
  showAddMedicineForm = false;
  showAddEvaluationForm = false;
  showAddNoteForm = false;
  showAddVacationForm = false;
  showAddMembershipForm = false;
  showAddPhysicalIssueForm = false;
  showAddAddressForm = false;

  childForm: FormGroup;
  workingHoursForm: FormGroup;
  medicineForm: FormGroup;
  evaluationForm: FormGroup;
  noteForm: FormGroup;
  vacationForm: FormGroup;
  membershipForm: FormGroup;
  physicalIssueForm: FormGroup;
  addressForm: FormGroup;

  editingAddressIndex: number | null = null;
  editingChildIndex: number | null = null;
  editingWorkingHoursIndex: number | null = null;
  editingMedicineIndex: number | null = null;
  editingEvaluationIndex: number | null = null;
  editingNoteIndex: number | null = null;
  editingVacationIndex: number | null = null;
  editingMembershipIndex: number | null = null;
  editingPhysicalIssueIndex: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.childForm = this.fb.group({
      userId: [''],
      name: ['', Validators.required],
      birthDate: ['', Validators.required]
    });

    this.workingHoursForm = this.fb.group({
      userId: [''],
      dayOfWeek: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });

    this.medicineForm = this.fb.group({
      userId: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      frequency: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.evaluationForm = this.fb.group({
      userId: [''],
      date: ['', Validators.required],
      progress: ['', Validators.required],
      description: ['', Validators.required],
      payment: ['', Validators.required],
      comment: ['', Validators.required]
    });

    this.noteForm = this.fb.group({
      userId: [''],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.vacationForm = this.fb.group({
      userId: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.membershipForm = this.fb.group({
      userId: [''],
      isCurrent: [false],
      fee: ['', Validators.required],
      trainingTypeId: ['', Validators.required],
      frequencyId: ['', Validators.required],
      startDate: ['', Validators.required]
    });

    this.physicalIssueForm = this.fb.group({
      userId: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.addressForm = this.fb.group({
      userId: [''],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>(environment.api.url + '/users/admin/' + this.id)
          .subscribe(data => {
            this.user = data;
          });
  }
  
  onAddChild(): void {
    this.childForm.value.userId = this.id;
    if (this.childForm.valid) {
      const newChild = this.childForm.value;
      this.http.post(environment.api.url + '/users/child/', newChild).subscribe();
      this.user.children.push(newChild);
      this.showAddChildForm = false;
      this.childForm.reset();
    }
  }

  onAddWorkingHours(): void {
    this.workingHoursForm.value.userId = this.id;
    if (this.workingHoursForm.valid) {
      const newWorking = this.workingHoursForm.value;
      this.http.post(environment.api.url + '/users/workhour/', newWorking).subscribe();
      this.user.workingHours.push(newWorking);
      this.showAddWorkingHoursForm = false;
      this.workingHoursForm.reset();
    }
  }

  onAddMedicine(): void {
    this.medicineForm.value.userId = this.id;
    if (this.medicineForm.valid) {
      const newMedicine = this.medicineForm.value;
      this.http.post(environment.api.url + '/users/medicine/', newMedicine).subscribe();
      this.user.medicin.push(newMedicine);
      this.showAddMedicineForm = false;
      this.medicineForm.reset();
    }
  }

  onAddEvaluation(): void {
    this.evaluationForm.value.userId = this.id;
    if (this.evaluationForm.valid) {
      const newEvaluation = this.evaluationForm.value;
      this.http.post(environment.api.url + '/users/evaluation/', newEvaluation).subscribe();
      this.user.evaluations.push(newEvaluation);
      this.showAddEvaluationForm = false;
      this.evaluationForm.reset();
    }
  }

  onAddNote(): void {
    this.noteForm.value.userId = this.id;
    if (this.noteForm.valid) {
      const newNote = this.noteForm.value;
      this.http.post(environment.api.url + '/users/note/', newNote).subscribe();
      this.user.notes.push(newNote);
      this.showAddNoteForm = false;
      this.noteForm.reset();
    }
  }

  onAddVacation(): void {
    this.vacationForm.value.userId = this.id;
    if (this.vacationForm.valid) {
      const newVacation = this.vacationForm.value;
      this.http.post(environment.api.url + '/users/vacation/', newVacation).subscribe();
      this.user.vacations.push(newVacation);
      this.showAddVacationForm = false;
      this.vacationForm.reset();
    }
  }

  onAddMembership(): void {
    this.membershipForm.value.userId = this.id;
    if (this.membershipForm.valid) {
      const newMembership = this.membershipForm.value;
      this.http.post(environment.api.url + '/users/membership/', newMembership).subscribe();
      this.user.memberships.push(newMembership);
      this.showAddMembershipForm = false;
      this.membershipForm.reset();
    }
  }

  onAddPhysicalIssue(): void {
    this.physicalIssueForm.value.userId = this.id;
    if (this.physicalIssueForm.valid) {
      const newPhysicalIssue = this.physicalIssueForm.value;
      this.http.post(environment.api.url + `/users/physicalissue/`, newPhysicalIssue).subscribe();
      this.user.phisicalIssues.push(newPhysicalIssue);
      this.showAddPhysicalIssueForm = false;
      this.physicalIssueForm.reset();
    }
  }

  onAddAddress(): void {
    this.addressForm.value.userId = this.id;
    if (this.addressForm.valid) {
      const newAddress = this.addressForm.value;
      this.http.post(environment.api.url + '/users/adress/', newAddress).subscribe();
      this.user.adresses.push(newAddress);
      this.showAddAddressForm = false;
      this.addressForm.reset();
    }
  }

  getDayOfWeek(day: number): string {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day - 1];
  }

  deleteUser(): void {
    this.http.delete(environment.api.url + '/users/' + this.id).subscribe();

    this.router.navigate(['/users']);
  }

  onEditAddress(index: number): void {
    this.editingAddressIndex = index;
    const address = this.user.adresses[index];
    this.addressForm.patchValue(address); // Populate the form with the selected address data
  }

  onUpdateAddress(): void {
    if (this.addressForm.valid && this.editingAddressIndex !== null) {
      const updatedAddress = this.addressForm.value;
      updatedAddress.userId = this.id;
      const addressId = this.user.adresses[this.editingAddressIndex].id; 

      this.http.put(environment.api.url + `/users/adress/${addressId}`, updatedAddress).subscribe(() => {
        // Update the local user object
        if (this.editingAddressIndex !== null) {
          this.user.adresses[this.editingAddressIndex] = updatedAddress;
        }
        this.editingAddressIndex = null; // Exit editing mode
        this.addressForm.reset();
      });
    }
  }

  cancelEdit(): void {
    this.editingAddressIndex = null;
    this.addressForm.reset();
  }

  onDeleteAddress(index: number): void {
    const addressId = this.user.adresses[index].id;
    this.http.delete(environment.api.url + `/users/adress/${addressId}`).subscribe(() => {
      this.user.adresses.splice(index, 1);
    });
    this.editingAddressIndex = null;
    this.addressForm.reset();
  }

  // child
  onEditChild(index: number): void {
    this.editingChildIndex = index;
    const child = this.user.children[index];
    this.childForm.patchValue(child);
  }

  onUpdateChild(): void {
    if (this.childForm.valid && this.editingChildIndex !== null) {
      const updatedChild = this.childForm.value;
      const childId = this.user.children[this.editingChildIndex].id;

      this.http.put(environment.api.url + `/users/child/${childId}`, updatedChild).subscribe(() => {
        if (this.editingChildIndex !== null) {
          this.user.children[this.editingChildIndex] = updatedChild;
        }
        this.editingChildIndex = null;
        this.childForm.reset();
      });
    }
  }

  cancelEditChild(): void {
    this.editingChildIndex = null;
    this.childForm.reset();
  }

  // endpoint not working yet
  onDeleteChild(index: number): void {
    const childId = this.user.children[index].id;
    this.http.delete(environment.api.url + `/users/child/${childId}`).subscribe(() => {
      this.user.children.splice(index, 1);
    });
    this.editingChildIndex = null;
    this.childForm.reset();
  }

  // working hours
  onEditWorkingHours(index: number): void {
    this.editingWorkingHoursIndex = index;
    const workingHour = this.user.workingHours[index];
    this.workingHoursForm.patchValue(workingHour);
  }

  onUpdateWorkingHours(): void {
    if (this.workingHoursForm.valid && this.editingWorkingHoursIndex !== null) {
      const updatedWorkingHour = this.workingHoursForm.value;
      const workingHourId = this.user.workingHours[this.editingWorkingHoursIndex].id; // Assuming each working hour has an `id`

      this.http.put(environment.api.url + `/users/workhour/${workingHourId}`, updatedWorkingHour).subscribe(() => {
        // Update the local user object
        if (this.editingWorkingHoursIndex !== null) {
          this.user.workingHours[this.editingWorkingHoursIndex] = updatedWorkingHour;
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
    const workingHourId = this.user.workingHours[index].id;
    this.http.delete(environment.api.url + `/users/workhour/${workingHourId}`).subscribe(() => {
      this.user.workingHours.splice(index, 1);
    });
    this.editingWorkingHoursIndex = null;
    this.workingHoursForm.reset();
  }


  // medicine
  onEditMedicine(index: number): void {
    this.editingMedicineIndex = index;
    const medicine = this.user.medicin[index];
    this.medicineForm.patchValue(medicine); 
  }

  onUpdateMedicine(): void {
    if (this.medicineForm.valid && this.editingMedicineIndex !== null) {
      const updatedMedicine = this.medicineForm.value;
      const medicineId = this.user.medicin[this.editingMedicineIndex].id;

      this.http.put(environment.api.url + `/users/medicine/${medicineId}`, updatedMedicine).subscribe(() => {
        if (this.editingMedicineIndex !== null) {
          this.user.medicin[this.editingMedicineIndex] = updatedMedicine;
        }
        this.editingMedicineIndex = null;
        this.medicineForm.reset();
      });
    }
  }

  cancelEditMedicine(): void {
    this.editingMedicineIndex = null;
    this.medicineForm.reset();
  }

  onDeleteMedicine(index: number): void {
    const medicineId = this.user.medicin[index].id;
    this.http.delete(environment.api.url + `/users/medicine/${medicineId}`).subscribe(() => {
      this.user.medicin.splice(index, 1);
    });
    this.editingMedicineIndex = null;
    this.medicineForm.reset();
  }

  //evaluation
  onEditEvaluation(index: number): void {
    this.editingEvaluationIndex = index;
    const evaluation = this.user.evaluations[index];
    this.evaluationForm.patchValue(evaluation); // Populate the form with the selected evaluation data
  }

  onUpdateEvaluation(): void {
    if (this.evaluationForm.valid && this.editingEvaluationIndex !== null) {
      const updatedEvaluation = this.evaluationForm.value;
      const evaluationId = this.user.evaluations[this.editingEvaluationIndex].id; // Assuming each evaluation has an `id`

      this.http.put(environment.api.url + `/users/evaluation/${evaluationId}`, updatedEvaluation).subscribe(() => {
        // Update the local user object
        if (this.editingEvaluationIndex !== null) {
          this.user.evaluations[this.editingEvaluationIndex] = updatedEvaluation;
        }
        this.editingEvaluationIndex = null; // Exit editing mode
        this.evaluationForm.reset();
      });
    }
  }

  cancelEditEvaluation(): void {
    this.editingEvaluationIndex = null;
    this.evaluationForm.reset();
  }

  onDeleteEvaluation(index: number): void {
    const evaluationId = this.user.evaluations[index].id;
    this.http.delete(environment.api.url + `/users/evaluation/${evaluationId}`).subscribe(() => {
      this.user.evaluations.splice(index, 1);
    });
    this.editingEvaluationIndex = null;
    this.evaluationForm.reset();
  }

    // membership
  onEditMembership(index: number): void {
    this.editingMembershipIndex = index;
    const membership = this.user.memberships[index];
    this.membershipForm.patchValue(membership); // Populate the form with the selected membership data
  }

  onUpdateMembership(): void {
    if (this.membershipForm.valid && this.editingMembershipIndex !== null) {
      const updatedMembership = this.membershipForm.value;
      const membershipId = this.user.memberships[this.editingMembershipIndex].id; // Assuming each membership has an `id`

      this.http.put(environment.api.url + `/users/membership/${membershipId}`, updatedMembership).subscribe(() => {
        // Update the local user object
        if (this.editingMembershipIndex !== null) {
          this.user.memberships[this.editingMembershipIndex] = updatedMembership;
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
    const membershipId = this.user.memberships[index].id;
    this.http.delete(environment.api.url + `/users/membership/${membershipId}`).subscribe(() => {
      this.user.memberships.splice(index, 1);
    });
    this.editingMembershipIndex = null;
    this.membershipForm.reset();
  }

    // Note
  onEditNote(index: number): void {
    this.editingNoteIndex = index;
    const note = this.user.notes[index];
    this.noteForm.patchValue(note); // Populate the form with the selected note data
  }

  onUpdateNote(): void {
    if (this.noteForm.valid && this.editingNoteIndex !== null) {
      const updatedNote = this.noteForm.value;
      const noteId = this.user.notes[this.editingNoteIndex].id; // Assuming each note has an `id`

      this.http.put(environment.api.url + `/users/note/${noteId}`, updatedNote).subscribe(() => {
        // Update the local user object
        if (this.editingNoteIndex !== null) {
          this.user.notes[this.editingNoteIndex] = updatedNote;
        }
        this.editingNoteIndex = null; // Exit editing mode
        this.noteForm.reset();
      });
    }
  }

  cancelEditNote(): void {
    this.editingNoteIndex = null;
    this.noteForm.reset();
  }

  onDeleteNote(index: number): void {
    const noteId = this.user.notes[index].id;
    this.http.delete(environment.api.url + `/users/note/${noteId}`).subscribe(() => {
      this.user.notes.splice(index, 1);
    });
    this.editingNoteIndex = null;
    this.noteForm.reset();
  }

// vacation
  onEditVacation(index: number): void {
    this.editingVacationIndex = index;
    const vacation = this.user.vacations[index];
    this.vacationForm.patchValue(vacation); // Populate the form with the selected vacation data
  }

  onUpdateVacation(): void {
    if (this.vacationForm.valid && this.editingVacationIndex !== null) {
      const updatedVacation = this.vacationForm.value;
      const vacationId = this.user.vacations[this.editingVacationIndex].id; // Assuming each vacation has an `id`

      this.http.put(environment.api.url + `/users/vacation/${vacationId}`, updatedVacation).subscribe(() => {
        // Update the local user object
        if (this.editingVacationIndex !== null) {
          this.user.vacations[this.editingVacationIndex] = updatedVacation;
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
    const vacationId = this.user.vacations[index].id;
    this.http.delete(environment.api.url + `/users/vacation/${vacationId}`).subscribe(() => {
      this.user.vacations.splice(index, 1);
    });
    this.editingVacationIndex = null;
    this.vacationForm.reset();
  }

  // physical issues
  onEditPhysicalIssue(index: number): void {
    this.editingPhysicalIssueIndex = index;
    const issue = this.user.phisicalIssues[index];
    this.physicalIssueForm.patchValue(issue); 
  }

  onUpdatePhysicalIssue(): void {
    if (this.physicalIssueForm.valid && this.editingPhysicalIssueIndex !== null) {
      const updatedIssue = this.physicalIssueForm.value;
      const issueId = this.user.phisicalIssues[this.editingPhysicalIssueIndex].id; // Assuming each issue has an `id`

      this.http.put(environment.api.url + `/users/physicalissue/${issueId}`, updatedIssue).subscribe(() => {
        // Update the local user object
        if (this.editingPhysicalIssueIndex !== null) {
          this.user.phisicalIssues[this.editingPhysicalIssueIndex] = updatedIssue;
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
    const issueId = this.user.phisicalIssues[index].id;
    this.http.delete(environment.api.url + `/users/physicalissue/${issueId}`).subscribe(() => {
      this.user.phisicalIssues.splice(index, 1);
    });
    this.editingPhysicalIssueIndex = null;
    this.physicalIssueForm.reset();
  }
}

