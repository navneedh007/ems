import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainbaseComponent } from "./mainbase/mainbase.component";
import { NavbarComponent } from "./mainbase/heropage/navbar/navbar.component";
import { HomeComponent } from "./mainbase/heropage/home/home.component";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ems2';
}
