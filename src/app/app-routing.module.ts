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
import { UserCreateComponent } from './services/user-create/user-create.component';
import { AgendaComponent } from './services/agenda/agenda.component';
import { AgendaUsersComponent } from './services/agenda-users/agenda.component';
import { TrainingCreateComponent } from './services/training-create/training-create.component';
import { TrainingEditComponent } from './services/training-edit/training-edit.component';
import { CallbackComponent } from './services/callback/callback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'over-ons', component: OverOnsComponent },
  { path: 'personal-training', component: PersonalTrainingComponent },
  { path: 'professional-personal-training', component: ProfessionalPersonalTrainingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'agenda-trainers', component: AgendaComponent },
  { path: 'agenda', component: AgendaUsersComponent },
  { path: 'training/create', component: TrainingCreateComponent },
  { path: 'training/edit/:id', component: TrainingEditComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UserOverviewComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'callback', component: CallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

