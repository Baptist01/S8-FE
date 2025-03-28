import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-overview-component',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './user-overview-component.component.html',
  styleUrl: './user-overview-component.component.css',
})

export class UserOverviewComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = []; 
  filteredUsers: any[] = []; // Filtered list of users based on search
  pageSize = 10; // Default page size
  currentPage = 0;
  searchQuery = ''; 

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<any[]>(environment.api.url + '/users')
      .subscribe(data => {
        this.users = data;
        this.filteredUsers = [...this.users];
        this.updatePaginatedUsers();
      });
      
  }

  updatePaginatedUsers(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }

  goToUserDetails(userId: string): void {
    this.router.navigate(['/users', userId]);
  }
  
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();

    // Filter users based on the search query
    this.filteredUsers = this.users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
    );

    // Reset pagination to the first page
    this.currentPage = 0;

    // Update paginated users
    this.updatePaginatedUsers();
  }
}
