import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AdresUserDetailsComponent } from 'src/app/components/user-details/adres-user-details/adres-user-details.component';
import { BaseUserDetailsComponent } from 'src/app/components/user-details/base-user-details/base-user-details.component';
import { ChildrenUserDetailsComponent } from 'src/app/components/user-details/children-user-details/children-user-details.component';
import { EvaluationUserDetailsComponent } from 'src/app/components/user-details/evaluation-user-details/evaluation-user-details.component';
import { MedicineUserDetailsComponent } from 'src/app/components/user-details/medicine-user-details/medicine-user-details.component';
import { MembershipUserDetailsComponent } from 'src/app/components/user-details/membership-user-details/membership-user-details.component';
import { NoteUserDetailsComponent } from 'src/app/components/user-details/note-user-details/note-user-details.component';
import { PhysicalIssueUserDetailsComponent } from 'src/app/components/user-details/physical-issue-user-details/physical-issue-user-details.component';
import { VacationUserDetailsComponent } from 'src/app/components/user-details/vacation-user-details/vacation-user-details.component';
import { WorkingHoursUserDetailsComponent } from 'src/app/components/user-details/working-hours-user-details/working-hours-user-details.component';
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
    AdresUserDetailsComponent,
    BaseUserDetailsComponent,
    ChildrenUserDetailsComponent,
    EvaluationUserDetailsComponent,
    MedicineUserDetailsComponent,
    MembershipUserDetailsComponent,
    NoteUserDetailsComponent,
    PhysicalIssueUserDetailsComponent,
    VacationUserDetailsComponent,
    WorkingHoursUserDetailsComponent,
  ],
  templateUrl: './user-details-component.component.html',
  styleUrl: './user-details-component.component.css',
})
export class UserDetailsComponent implements OnInit {
  id: string | null = null;
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http
      .get<any[]>(environment.api.url + '/users/admin/' + this.id, {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.user = data;
      });
  }

  deleteUser(): void {
    this.http.delete(environment.api.url + '/users/' + this.id, {
      withCredentials: true,
    }).subscribe();

    this.router.navigate(['/users']);
  }
}
