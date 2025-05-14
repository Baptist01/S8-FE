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
  selector: 'app-children-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './children-user-details.component.html',
  styleUrl: './children-user-details.component.css',
})
export class ChildrenUserDetailsComponent {
  @Input() userId: string | null = null;
  @Input() children: any[] = [];
  @Output() childrenUpdated = new EventEmitter<any[]>();
  showAddChildForm = false;
  childForm: FormGroup;
  editingChildIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.childForm = this.fb.group({
      notRelevant: [Boolean],
      userId: [''],
      name: [''],
      birthDate: [''],
    });
  }

  onAddChild(): void {
    this.childForm.value.userId = this.userId;
    if (this.childForm.valid) {
      if (this.childForm.value.notRelevant) {
        const noChild = this.childForm.value;
        noChild.name = 'No Child';
        noChild.birthDate = '1999-01-01';
        this.http
          .post(environment.api.url + '/users/child/', noChild, {
            withCredentials: true,
          })
          .subscribe();
        this.children.push(noChild);
        this.showAddChildForm = false;
        this.childForm.reset();
      } else {
        const newChild = this.childForm.value;
        this.http
          .post(environment.api.url + '/users/child/', newChild, {
            withCredentials: true,
          })
          .subscribe();
        this.children.push(newChild);
        this.showAddChildForm = false;
        this.childForm.reset();
      }
    }
  }

  onEditChild(index: number): void {
    this.editingChildIndex = index;
    const child = this.children[index];
    this.childForm.patchValue(child);
  }

  onUpdateChild(): void {
    if (this.childForm.valid && this.editingChildIndex !== null) {
      const updatedChild = this.childForm.value;
      const childId = this.children[this.editingChildIndex].id;

      this.http
        .put(environment.api.url + `/users/child/${childId}`, updatedChild, {
          withCredentials: true,
        })
        .subscribe(() => {
          if (this.editingChildIndex !== null) {
            this.children[this.editingChildIndex] = updatedChild;
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

  onDeleteChild(index: number): void {
    const childId = this.children[index].id;
    this.http
      .delete(environment.api.url + `/users/child/${childId}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.children.splice(index, 1);
      });
    this.editingChildIndex = null;
    this.childForm.reset();
  }
}
