import { Component, inject, OnDestroy, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { environment } from '../enviroment/enviroment';
// import { authCodeFlowConfig } from './auth-guard';
import { AuthService } from './auth-guard-service';
import { environment } from 'src/enviroment/enviroment';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userId: string | null = null;
  public isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isHeadCoach: boolean = false;
  isTrainer: boolean = false;
  isSporter: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userId = this.authService.getUserId();
      this.isLoggedIn = true;
      const jwt = localStorage.getItem('access_token') || '';
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      const roles = payload['roles'];
      this.isAdmin = roles.includes('admin');
      this.isHeadCoach = roles.includes('headcoach') || roles.includes('admin');
      this.isTrainer = roles.includes('trainer') || roles.includes('headcoach') || roles.includes('admin');
      this.isSporter = roles.includes('sporter') || roles.includes('trainer') || roles.includes('headcoach') || roles.includes('admin');
    }
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setLogedIn() {
    this.isLoggedIn = true;
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected readonly environment = environment;
}
