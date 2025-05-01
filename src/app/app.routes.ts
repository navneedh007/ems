import { Routes } from '@angular/router';
import { MainbaseComponent } from './mainbase/mainbase.component';
import { LoginComponent } from './mainbase/login/login.component';
import { RegisterComponent } from './mainbase/register/register.component';
import { NavbarComponent } from './mainbase/heropage/navbar/navbar.component';
import { HomeComponent } from './mainbase/heropage/home/home.component';
import { SidenavComponent } from './mainbase/organizer/sidenav/sidenav.component';
import { EventsComponent } from './mainbase/organizer/events/events.component';
import { CreateEventComponent } from './mainbase/organizer/events/create-event/create-event.component';
import { OrganizerComponent } from './mainbase/organizer/organizer.component';

export const routes: Routes = [
    // {
    //     path: '',  // Default route
    //     redirectTo: '/app-mainbase', // Redirect to the hero page
    //     pathMatch: 'full'
    // },
    {
        path: 'app-mainbase',
        component: MainbaseComponent
    },
    {
        path: 'app-navbar',
        component: NavbarComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'app-login',
        component: LoginComponent
    },
    {
        path: 'app-register',
        component: RegisterComponent
    },
    { path: 'organizer', redirectTo: 'organizer/events', pathMatch: 'full' },
    {
        path: 'app-sidenav',
        component: SidenavComponent
    },
    {
        path: 'organizer',
        component: OrganizerComponent,
        children: [
          {
            path: 'events',
            component: EventsComponent
          },
          {
            path: 'create-event',
            component: CreateEventComponent
          }
          // Add other child routes as needed
        ]
    },
    {
        path: 'app-create-event',
        component: CreateEventComponent
    }
];
