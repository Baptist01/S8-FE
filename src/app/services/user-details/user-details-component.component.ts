import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details-component',
  imports: [
    CommonModule,
    ReactiveFormsModule
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

  childForm: FormGroup;
  workingHoursForm: FormGroup;
  medicineForm: FormGroup;
  evaluationForm: FormGroup;
  noteForm: FormGroup;
  vacationForm: FormGroup;
  membershipForm: FormGroup;
  physicalIssueForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {
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
      isCurrent: ['', Validators.required],
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
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>('http://localhost:5003/api/users/' + this.id)
          .subscribe(data => {
            this.user = data;
          });
  }
  
  onAddChild(): void {
    this.childForm.value.userId = this.id;
    if (this.childForm.valid) {
      const newChild = this.childForm.value;
      this.http.post(`http://localhost:5003/api/users/child/`, newChild).subscribe();
      this.user.children.push(newChild);
      this.showAddChildForm = false;
      this.childForm.reset();
    }
  }

  onAddWorkingHours(): void {
    this.workingHoursForm.value.userId = this.id;
    if (this.workingHoursForm.valid) {
      const newWorking = this.workingHoursForm.value;
      this.http.post(`http://localhost:5003/api/users/workhour/`, newWorking).subscribe();
      this.user.workingHours.push(newWorking);
      this.showAddWorkingHoursForm = false;
      this.workingHoursForm.reset();
    }
  }

  onAddMedicine(): void {
    this.medicineForm.value.userId = this.id;
    if (this.medicineForm.valid) {
      const newMedicine = this.medicineForm.value;
      this.http.post(`http://localhost:5003/api/users/medicine/`, newMedicine).subscribe();
      this.user.medicin.push(newMedicine);
      this.showAddMedicineForm = false;
      this.medicineForm.reset();
    }
  }

  onAddEvaluation(): void {
    this.evaluationForm.value.userId = this.id;
    if (this.evaluationForm.valid) {
      const newEvaluation = this.evaluationForm.value;
      this.http.post(`http://localhost:5003/api/users/evaluation/`, newEvaluation).subscribe();
      this.user.evaluations.push(newEvaluation);
      this.showAddEvaluationForm = false;
      this.evaluationForm.reset();
    }
  }

  onAddNote(): void {
    this.noteForm.value.userId = this.id;
    if (this.noteForm.valid) {
      const newNote = this.noteForm.value;
      this.http.post(`http://localhost:5003/api/users/note/`, newNote).subscribe();
      this.user.notes.push(newNote);
      this.showAddNoteForm = false;
      this.noteForm.reset();
    }
  }

  onAddVacation(): void {
    this.vacationForm.value.userId = this.id;
    if (this.vacationForm.valid) {
      const newVacation = this.vacationForm.value;
      this.http.post(`http://localhost:5003/api/users/vacation/`, newVacation).subscribe();
      this.user.vacations.push(newVacation);
      this.showAddVacationForm = false;
      this.vacationForm.reset();
    }
  }

  onAddMembership(): void {
    this.membershipForm.value.userId = this.id;
    if (this.membershipForm.valid) {
      const newMembership = this.membershipForm.value;
      this.http.post(`http://localhost:5003/api/users/membership/`, newMembership).subscribe();
      this.user.memberships.push(newMembership);
      this.showAddMembershipForm = false;
      this.membershipForm.reset();
    }
  }

  onAddPhysicalIssue(): void {
    this.physicalIssueForm.value.userId = this.id;
    if (this.physicalIssueForm.valid) {
      const newPhysicalIssue = this.physicalIssueForm.value;
      this.http.post(`http://localhost:5003/api/users/physicalissue/`, newPhysicalIssue).subscribe();
      this.user.phisicalIssues.push(newPhysicalIssue);
      this.showAddPhysicalIssueForm = false;
      this.physicalIssueForm.reset();
    }
  }
}

