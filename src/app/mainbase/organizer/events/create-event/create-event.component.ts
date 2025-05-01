import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ievents } from '../../../../model/interface/Events';

@Component({
  selector: 'app-create-event',
  imports: [ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {
  eventlist: Ievents[] = [];
  eventForm!: FormGroup;
  http = inject(HttpClient);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      venue: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      this.http.post<Ievents>('https://localhost:7183/api/Event/add-event', eventData).subscribe({
        next: (data) => {
          this.eventlist.push(data);
          console.log('Event created:', data);
          this.eventForm.reset();
        },
        error: (error) => {
          console.error('Error creating event:', error);
        }
      });
    }
  }
}