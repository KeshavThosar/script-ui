import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthService } from '../services/auth.service';
import { AuthUserCredential } from '../data-types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatInputModule, FlexLayoutModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginActive: boolean = true

  constructor(private auth: AuthService) { }

  async signUp(data: AuthUserCredential) {
    this.auth.signUp(data)
  }

  async login(data: AuthUserCredential) {
    this.auth.login(data)
  }

  setLoginActive(val:boolean) {
    this.loginActive = val
  }

}
