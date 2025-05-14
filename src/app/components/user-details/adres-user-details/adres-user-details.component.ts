import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-adres-user-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './adres-user-details.component.html',
  styleUrl: './adres-user-details.component.css',
  standalone: true,
})
export class AdresUserDetailsComponent {
  @Input() userId: string | null = null;
  @Input() adresses: any[] = [];
  @Output() addressesUpdated = new EventEmitter<any[]>();

  editingAddressIndex: number | null = null;
  addressForm: FormGroup;
  showAddAddressForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {
    this.addressForm = this.fb.group({
      userId: [''],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onEditAddress(index: number): void {
    this.editingAddressIndex = index;
    const address = this.adresses[index];
    this.addressForm.patchValue(address); // Populate the form with the selected address data
  }

  onUpdateAddress(): void {
    if (this.addressForm.valid && this.editingAddressIndex !== null) {
      const updatedAddress = this.addressForm.value;
      updatedAddress.userId = this.userId;
      const addressId = this.adresses[this.editingAddressIndex].id;

      this.http
        .put(
          environment.api.url + `/users/adress/${addressId}`,
          updatedAddress,
          {
            withCredentials: true,
          },
        )
        .subscribe(() => {
          // Update the local user object
          if (this.editingAddressIndex !== null) {
            this.adresses[this.editingAddressIndex] = updatedAddress;
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
    const addressId = this.adresses[index].id;
    this.http
      .delete(environment.api.url + `/users/adress/${addressId}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.adresses.splice(index, 1);
      });
    this.editingAddressIndex = null;
    this.addressForm.reset();
  }

  onAddAddress(): void {
    this.addressForm.value.userId = this.userId;
    if (this.addressForm.valid) {
      const newAddress = this.addressForm.value;
      this.http
        .post(environment.api.url + '/users/adress/', newAddress, {
          withCredentials: true,
        })
        .subscribe();
      this.adresses.push(newAddress);
      this.showAddAddressForm = false;
      this.addressForm.reset();
    }
  }
}
