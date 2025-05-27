import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-agenda-users',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './agenda-users.component.html',
  styleUrl: './agenda-users.component.css',
})
export class AgendaUsersComponent {
  @ViewChild('scrollableContainer') scrollableContainer!: ElementRef;

  user: any = {};
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
  ) {}
  ngOnInit(): void {
    this.getTrainings();
    this.http
      .get<any[]>(environment.api.url + '/users/profile', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.user = data;
      });
  }

  getTrainings(): void {
    this.http
      .get<any[]>(environment.api.url + '/trainings/GetTrainingForUsers', {
        withCredentials: true,
      })
      .subscribe((response) => {
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
            a.start_time.localeCompare(b.start_time),
          );
        }

        // Get sorted dates
        this.sortedDates = Object.keys(this.groupedTrainings).sort((a, b) =>
          a.localeCompare(b),
        );

        // Scroll to the current date
        setTimeout(() => this.scrollToCurrentDate(), 0);
      });
  }

  subscribeToTraining(trainingId: string): void {
    this.http
      .post(
        environment.api.url + '/trainings/addUser',
        { trainingId: trainingId, userId: this.user.id, roleId: 1 },
        { withCredentials: true },
      )
      .subscribe((response) => {
        console.log('Subscribed to training:', response);
        this.getTrainings();
      });
  }

  unsubscribeFromTraining(trainingId: string): void {
    this.http
      .delete(
        environment.api.url +
          '/trainings/deleteuserfromtrainingbyuser?trainingid=' +
          trainingId +
          '&userid=' +
          this.user.id,
        {
          withCredentials: true,
        },
      )
      .subscribe((response) => {
        console.log('Unsubscribed from training:', response);
        this.getTrainings(); // Refresh the trainings after unsubscribing
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
      const upcomingDate = this.sortedDates.find((date) => date >= today);
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

  isUserSubscribed(training: any): boolean {
    return training.users?.some((u: any) => u.userId === this.user.id);
  }

  isUserNotSubscribed(training: any): boolean {
    return !this.isUserSubscribed(training);
  }

  getTrainerName(users: any[]): string {
    const trainer = users?.find((user: any) => user.roleId === 2);
    return trainer ? trainer.firstName : 'Geen trainer';
  }
}
