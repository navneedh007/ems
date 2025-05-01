import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';
import { Icategory } from '../../../model/interface/Categories';
import { Ilocations } from '../../../model/interface/Locations';
import { Ievents } from '../../../model/interface/Events';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  eventlist: Ievents[] = [];
  locationlist: Ilocations[] = [];
  categorylist: Icategory[] = [];
  locations: Map<number, string> = new Map();
  categories: Map<number, string> = new Map();
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.http.get<Ievents[]>('https://localhost:7183/api/Event/index').subscribe({
      next: (events) => {
        this.eventlist = events;
        
        // Get unique location and category IDs
        const locationIds = [...new Set(events.map(e => e.locationID))];
        const categoryIds = [...new Set(events.map(e => e.categoryID))];
        
        // Create arrays of observables for parallel requests
        const locationRequests = locationIds.map(id =>
          this.http.get<Ilocations>(`https://localhost:7183/api/Location/${id}`)
        );
        const categoryRequests = categoryIds.map(id =>
          this.http.get<Icategory>(`https://localhost:7183/api/Categories/${id}`)
        );

        // Fetch locations
        forkJoin(locationRequests).subscribe({
          next: (locations) => {
            locations.forEach(location => {
              this.locations.set(location.locationID, location.locationName);
            });
          },
          error: (error) => console.error('Error fetching locations:', error)
        });
        

        // Fetch categories
        forkJoin(categoryRequests).subscribe({
          next: (categories) => {
            categories.forEach(category => {
              this.categories.set(category.categoryID, category.categoryName);
            });
          },
          error: (error) => console.error('Error fetching categories:', error)
        });

        console.log('Events loaded:', this.eventlist);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  getLocationName(locationId: number): string {
    return this.locations.get(locationId) || `Location ${locationId}`;
  }

  getCategoryName(categoryId: number): string {
    return this.categories.get(categoryId) || `Category ${categoryId}`;
  }

  getEventStatus(event: Ievents): 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled' {
    if (!event.isActive) return 'Cancelled';
    
    const currentDate = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (currentDate < startDate) {
      return 'Upcoming';
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return 'In Progress';
    } else {
      return 'Completed';
    }
  }

  get activeEvents(): number {
    return this.eventlist.filter(event => this.getEventStatus(event) === 'In Progress').length;
  }

  get upcomingEvents(): number {
    return this.eventlist.filter(event => this.getEventStatus(event) === 'Upcoming').length;
  }

  get completedEvents(): number {
    return this.eventlist.filter(event => this.getEventStatus(event) === 'Completed').length;
  }

  get cancelledEvents(): number {
    return this.eventlist.filter(event => !event.isActive).length;
  }

  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.eventlist.length / this.itemsPerPage);
  }

  get paginatedEvents(): Ievents[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.eventlist.slice(startIndex, endIndex);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
  }

  getStatusClass(event: Ievents): string {
    const status = this.getEventStatus(event);
    switch(status) {
      case 'Upcoming': return 'bg-primary';
      case 'In Progress': return 'bg-warning';
      case 'Completed': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
  

  getStatusIcon(event: Ievents): string {
    const status = this.getEventStatus(event);
    switch(status) {
      case 'Upcoming': return 'bi-calendar';
      case 'In Progress': return 'bi-play-circle';
      case 'Completed': return 'bi-check-circle';
      case 'Cancelled': return 'bi-x-circle';
      default: return 'bi-question-circle';
    }
  }

  getPaginationInfo(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.eventlist.length);
    return `Showing ${start} to ${end} of ${this.eventlist.length} entries`;
  }
}