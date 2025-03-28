import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit { 
  id: string | null = null;
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');

    this.id = 'ffec4ad5-3498-4698-9e97-05b91cb6b4e0';
    this.http.get<any[]>(environment.api.url + '/users/' + this.id)
          .subscribe(data => {
            this.user = data;
          });
  }

  getDayOfWeek(day: number): string {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day - 1];
  }
}
