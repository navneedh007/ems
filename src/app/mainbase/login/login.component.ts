import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ilogin } from '../../model/interface/Logins';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginData: Ilogin={
      Email: '',
      Password: ''
    }
    onSubmit() {
      // Handle form submission
      console.log('Login Data:', this.loginData);
    }
}

