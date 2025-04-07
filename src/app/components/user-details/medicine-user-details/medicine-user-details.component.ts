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
  selector: 'app-medicine-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './medicine-user-details.component.html',
  styleUrl: './medicine-user-details.component.css',
})
export class MedicineUserDetailsComponent {
  @Input() userId: string | null = null;
  @Input() medicin: any[] = [];
  @Output() medicineUpdated = new EventEmitter<any[]>();
  showAddMedicineForm = false;
  medicineForm: FormGroup;
  editingMedicineIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.medicineForm = this.fb.group({
      notRelevant: [Boolean],
      userId: [''],
      name: [''],
      description: [''],
      frequency: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  onAddMedicine(): void {
    this.medicineForm.value.userId = this.userId;
    if (this.medicineForm.valid) {
      if (this.medicineForm.value.notRelevant) {
        this.medicineForm.patchValue({
          userId: this.userId,
          name: 'No medicine',
          description: 'Not relevant',
          frequency: 'Not relevant',
          startDate: '1999-01-01',
          endDate: '1999-01-01',
        });
        this.http
          .post(environment.api.url + '/users/medicine/', this.medicineForm.value)
          .subscribe();
        this.medicin.push(this.medicineForm.value);
        this.showAddMedicineForm = false;
        this.medicineForm.reset();
      } else {
        const newMedicine = this.medicineForm.value;
        this.http
          .post(environment.api.url + '/users/medicine/', newMedicine)
          .subscribe();
        this.medicin.push(newMedicine);
        this.showAddMedicineForm = false;
        this.medicineForm.reset();
      }
    }
  }

  onEditMedicine(index: number): void {
    this.editingMedicineIndex = index;
    const medicine = this.medicin[index];
    this.medicineForm.patchValue(medicine);
  }

  onUpdateMedicine(): void {
    if (this.medicineForm.valid && this.editingMedicineIndex !== null) {
      const updatedMedicine = this.medicineForm.value;
      const medicineId = this.medicin[this.editingMedicineIndex].id;

      this.http
        .put(
          environment.api.url + `/users/medicine/${medicineId}`,
          updatedMedicine,
        )
        .subscribe(() => {
          if (this.editingMedicineIndex !== null) {
            this.medicin[this.editingMedicineIndex] = updatedMedicine;
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
    const medicineId = this.medicin[index].id;
    this.http
      .delete(environment.api.url + `/users/medicine/${medicineId}`)
      .subscribe(() => {
        this.medicin.splice(index, 1);
      });
    this.editingMedicineIndex = null;
    this.medicineForm.reset();
  }
}
