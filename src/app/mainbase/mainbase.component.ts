import { Component } from '@angular/core';
import { NavbarComponent } from "./heropage/navbar/navbar.component";
import { HomeComponent } from "./heropage/home/home.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainbase',
  imports: [ NavbarComponent, HomeComponent,RouterOutlet],
  templateUrl: './mainbase.component.html',
  styleUrl: './mainbase.component.css'
})
export class MainbaseComponent {

}
