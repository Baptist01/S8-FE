import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './services/home/home.component';
import { OverOnsComponent } from './services/over-ons/over-ons.component';
import { PersonalTrainingComponent } from './services/personal-training/personal-training.component';
import { ProfessionalPersonalTrainingComponent } from './services/professional-personal-training/professional-personal-training.component';
import { ContactComponent } from './services/contact/contact.component';
import { ProfileComponent } from './services/profile/profile.component';
import { UserOverviewComponent } from './services/user-overview/user-overview-component.component';
import { UserDetailsComponent } from './services/user-details/user-details-component.component';
import { authGuard } from './auth-guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'over-ons', component: OverOnsComponent },
  { path: 'personal-training', component: PersonalTrainingComponent },
  { path: 'professional-personal-training', component: ProfessionalPersonalTrainingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard(true, '/')] },
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

