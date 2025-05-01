import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [RouterModule, SidenavComponent],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.css'
})
export class OrganizerComponent {
}