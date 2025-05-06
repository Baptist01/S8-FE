import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{
  private readonly router: Router = inject(Router);

  async ngOnInit(): Promise<void> {
    this.router.navigate(['/profile']);
  }
}
