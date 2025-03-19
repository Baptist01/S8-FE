import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './services/home/home.component';
import { OverOnsComponent } from './services/over-ons/over-ons.component';
import { PersonalTrainingComponent } from './services/personal-training/personal-training.component';
import { ProfessionalPersonalTrainingComponent } from './services/professional-personal-training/professional-personal-training.component';
import { ContactComponent } from './services/contact/contact.component';
import { NgOptimizedImage } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { environment } from '../enviroment/enviroment';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { TrainerInfoCardComponent } from './components/trainer-info-card/trainer-info-card.component';
import { FusionAuthModule } from '@fusionauth/angular-sdk';

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
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TrainerInfoCardComponent,
    ContactFormComponent,
    FusionAuthModule.forRoot({
      clientId: environment.auth.clientId,
      serverUrl: environment.auth.serverUrl,
      redirectUri: environment.auth.redirectUri,
      postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
      scope: environment.auth.scope,
      shouldAutoRefresh: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
