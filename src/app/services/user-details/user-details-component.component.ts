import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details-component',
  imports: [
    CommonModule 
  ],
  templateUrl: './user-details-component.component.html',
  styleUrl: './user-details-component.component.css'
})

export class UserDetailsComponent implements OnInit {
  id: string | null = null;
  user: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>('http://localhost:5003/api/users/' + this.id)
          .subscribe(data => {
            this.user = data;
          });
  }
}

