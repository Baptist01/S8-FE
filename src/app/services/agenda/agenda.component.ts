import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';
import { FusionAuthService, UserInfo } from '@fusionauth/angular-sdk';

@Component({
  selector: 'app-agenda',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  @ViewChild('scrollableContainer') scrollableContainer!: ElementRef;
  userInfo: UserInfo | null = null;

  trainings: any[] = [];
  paginatedTrainings: any[] = [];
  filteredTrainings: any[] = []; 
  pageSize = 10;
  currentPage = 0;
  searchQuery = '';
  hoveredUsers: string | null = null;

  groupedTrainings: { [key: string]: any[] } = {};
  sortedDates: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private fusionAuthService: FusionAuthService,
  ) {}

  ngOnInit(): void {
    this.getTrainings();

    if (this.fusionAuthService.isLoggedIn()) {
      this.fusionAuthService.getUserInfoObservable().subscribe({
        next: (info) => (this.userInfo = info),
        error: (err) => console.error('Error fetching user info:', err),
      });
    }
  }

  getTrainings(): void {
    this.http.get<any[]>(environment.api.url + '/trainings', {
      withCredentials: true,
    }).subscribe((response) => {
      this.trainings = response;

      // Group trainings by date
      this.groupedTrainings = this.trainings.reduce((acc, training) => {
        const date = training.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(training);
        return acc;
      }, {});

      // Sort each group by start time
      for (const date in this.groupedTrainings) {
        this.groupedTrainings[date].sort((a, b) =>
          a.start_time.localeCompare(b.start_time)
        );
      }

      // Get sorted dates
      this.sortedDates = Object.keys(this.groupedTrainings).sort((a, b) =>
        a.localeCompare(b)
      );

      // Scroll to the current date
      setTimeout(() => this.scrollToCurrentDate(), 0);
    });
  }

  scrollToCurrentDate(): void {
    const today = new Date().toISOString().split('T')[0];
    const todayElement = document.getElementById(`date-${today}`);
    if (todayElement && this.scrollableContainer) {
      const container = this.scrollableContainer.nativeElement;
      const offsetTop = todayElement.offsetTop - container.offsetTop;
      container.scrollTo({ top: offsetTop + 200, behavior: 'smooth' });
    } else {
      // Scroll to the next upcoming date
      const upcomingDate = this.sortedDates.find(date => date >= today);
      if (upcomingDate) {
        const upcomingElement = document.getElementById(`date-${upcomingDate}`);
        if (upcomingElement && this.scrollableContainer) {
          const container = this.scrollableContainer.nativeElement;
          const offsetTop = upcomingElement.offsetTop - container.offsetTop;
          container.scrollTo({ top: offsetTop + 200, behavior: 'smooth' });
        }
      }
    }
  }

  updatePaginatedTrainings(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTrainings = this.filteredTrainings.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedTrainings();
  }

  goToTrainingDetails(trainingId: string): void {
    this.router.navigate(['/training', trainingId]);
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();

    // Filter users based on the search query
    this.filteredTrainings = this.trainings.filter((training) =>
      `${training.name} ${training.type} ${training.date} ${training.start_time}`.toLowerCase().includes(query),
    );

    this.currentPage = 0;

    this.updatePaginatedTrainings();
  }

  showUserNames(users: any[]): void {
    this.hoveredUsers = users
      .sort((a, b) => b.roleId - a.roleId) // Sort trainers (roleId === 2) to the top
      .map((user) => {
      const role = user.roleId === 2 ? `Trainer:` : `Sporter:`;
      return `${role} ${user.firstName} ${user.lastName}`;
      })
      .join('\n');
  }
  

  hideUserNames(): void {
    this.hoveredUsers = null;
  }

  isPastDate(date: string): boolean {
    const today = new Date().toISOString().split('T')[0];
    return date < today;
  }
}
