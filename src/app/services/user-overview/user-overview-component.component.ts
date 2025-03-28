import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';


@Component({
  selector: 'app-user-overview-component',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './user-overview-component.component.html',
  styleUrl: './user-overview-component.component.css',
})

export class UserOverviewComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http.get<any[]>(environment.api.url + '/users')
      .subscribe(data => {
        this.users = data;
      });

      console.log(environment.api.url + '/users');
  }

  goToUserDetails(userId: string): void {
    this.router.navigate(['/users', userId]);
  }
}
