import { Component } from '@angular/core';
import { Iregister } from '../../model/interface/Registers';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData:Iregister={
    UserID: 0,
    Name: '',
    Email: '',
    Password: '',
    ContactNumber: '',
    UserType: ''
  };
  onSubmit() {
    // Handle form submission
    console.log('Register Data:', this.registerData);
  }
}
