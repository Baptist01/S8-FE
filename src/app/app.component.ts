import { Component, inject, OnDestroy, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { environment } from '../enviroment/enviroment';
// import { authCodeFlowConfig } from './auth-guard';
// import { AuthService } from './auth-guard-service';
import { environment } from 'src/enviroment/enviroment';
import { FusionAuthService, UserInfo } from '@fusionauth/angular-sdk';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private fusionAuthService: FusionAuthService = inject(FusionAuthService);

  isLoggedIn: boolean = this.fusionAuthService.isLoggedIn();
  userInfo: UserInfo | null = null;
  isGettingUserInfo: boolean = false;
  subscription?: Subscription;
  userId: string | null = null;
  // public isLoggedIn: boolean = false;

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.subscription = this.fusionAuthService
        .getUserInfoObservable({
          onBegin: () => (this.isGettingUserInfo = true),
          onDone: () => (this.isGettingUserInfo = false),
        })
        .subscribe({
          next: (userInfo) => (this.userInfo = userInfo),
          error: (error) => console.error(error),
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login() {
    console.log('login');
    this.fusionAuthService.startLogin();
  }

  logout() {
    this.fusionAuthService.logout();
  }

  isAdmin: boolean = true;
  isHeadCoach: boolean = true;
  isTrainer: boolean = true;
  isSporter: boolean = true;

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected readonly environment = environment;
}

