import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './services/home/home.component';
import { OverOnsComponent } from './services/over-ons/over-ons.component';
import { PersonalTrainingComponent } from './services/personal-training/personal-training.component';
import { ProfessionalPersonalTrainingComponent } from './services/professional-personal-training/professional-personal-training.component';
import { ContactComponent } from './services/contact/contact.component';
import { NgOptimizedImage } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ContactButtonComponent } from './components/contact-button/contact-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { TrainerInfoCardComponent } from './components/trainer-info-card/trainer-info-card.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdresUserDetailsComponent } from './components/user-details/adres-user-details/adres-user-details.component';
import { BaseUserDetailsComponent } from './components/user-details/base-user-details/base-user-details.component';
import { ChildrenUserDetailsComponent } from './components/user-details/children-user-details/children-user-details.component';
import { EvaluationUserDetailsComponent } from './components/user-details/evaluation-user-details/evaluation-user-details.component';
import { MedicineUserDetailsComponent } from './components/user-details/medicine-user-details/medicine-user-details.component';
import { MembershipUserDetailsComponent } from './components/user-details/membership-user-details/membership-user-details.component';
import { NoteUserDetailsComponent } from './components/user-details/note-user-details/note-user-details.component';
import { PhysicalIssueUserDetailsComponent } from './components/user-details/physical-issue-user-details/physical-issue-user-details.component';
import { VacationUserDetailsComponent } from './components/user-details/vacation-user-details/vacation-user-details.component';
import { WorkingHoursUserDetailsComponent } from './components/user-details/working-hours-user-details/working-hours-user-details.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverOnsComponent,
    PersonalTrainingComponent,
    ProfessionalPersonalTrainingComponent,
    ContactComponent,
    ContactButtonComponent,
    HomeComponent,
  ],
  imports: [
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
    CommonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TrainerInfoCardComponent,
    ContactFormComponent,
    MatPaginatorModule,
    MatSidenavModule,
    OAuthModule.forRoot()
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
