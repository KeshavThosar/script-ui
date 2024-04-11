import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";

import { Observable } from 'rxjs';
import { ScriptUiConfigStoreItem } from '../data-types';
import { RouterModule } from '@angular/router';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatDialogModule, RouterModule ,FlexLayoutModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // private firestore: Firestore = inject(Firestore)
  configs: ScriptUiConfigStoreItem[] = []
  longText = 'Hello'
  dialog: MatDialog = inject(MatDialog)
  
  
  constructor(private firestore: FirestoreService, private authService: AuthService) {
    console.log('dashboard')
    authService.authState$.subscribe((aUser: User | null) => {
      if(aUser) {
        firestore.getConfigStoreItems(aUser.uid).subscribe((data) => {
          this.configs = data
        })
      }
    })
  }

  confirmDelete(id: string, configName: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {title: 'Delete '+ configName , message: 'Are you sure you want to delete this config?'},
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'delete-yes') {
        this.firestore.deleteConfigStoreItem(id).then((res) => {

        })
      }
    })
  }
}
