import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule]
})
export class HeaderComponent {
  isLoggedIn: boolean = false
  
  constructor(private auth: AuthService) { 
    this.auth.isLoggedIn.subscribe((val) => {
      this.isLoggedIn = val
    })
  }

  logout(){
    this.auth.logout()
  }

}
