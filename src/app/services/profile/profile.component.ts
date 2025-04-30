import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AdresUserDetailsComponent } from 'src/app/components/user-details/adres-user-details/adres-user-details.component';
import { BaseUserDetailsComponent } from 'src/app/components/user-details/base-user-details/base-user-details.component';
import { ChildrenUserDetailsComponent } from 'src/app/components/user-details/children-user-details/children-user-details.component';
import { MedicineUserDetailsComponent } from 'src/app/components/user-details/medicine-user-details/medicine-user-details.component';
import { PhysicalIssueUserDetailsComponent } from 'src/app/components/user-details/physical-issue-user-details/physical-issue-user-details.component';
import { VacationUserDetailsComponent } from 'src/app/components/user-details/vacation-user-details/vacation-user-details.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-guard-service';
import { environment } from 'src/enviroment/enviroment';
import { delay } from 'cypress/types/bluebird';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    PhysicalIssueUserDetailsComponent,
    VacationUserDetailsComponent,
    MedicineUserDetailsComponent,
    AdresUserDetailsComponent,
    BaseUserDetailsComponent,
    ChildrenUserDetailsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any = {};
  id: string | null = null;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    const token = (await localStorage.getItem('access_token')) || '';
    this.http
      .get<any[]>(environment.api.url + '/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe((data) => {
        this.user = data;
      });
  }

  getDayOfWeek(day: number): string {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return days[day - 1];
  }
}
