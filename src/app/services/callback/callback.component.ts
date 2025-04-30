import { Component, inject, OnInit } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-guard-service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.authService.handleCallback().finally(() => {
      this.router.navigate(['/profile']);
    });

    // this.authService.handleCallback().then(() => {
    //   this.router.navigate(['/profile']);
    // });
  }
}
