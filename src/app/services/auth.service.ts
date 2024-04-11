import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, user } from '@angular/fire/auth';
import { AuthUserCredential } from '../data-types';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authState$: Observable<User | null> = authState(this.auth)

  constructor() {
    this.authState$.subscribe((aUser: User | null) => {
      if(aUser) {
        this.isLoggedIn.next(true)
      }else{
        this.isLoggedIn.next(false)
      }
    })
  }

  login(data: AuthUserCredential) {
    signInWithEmailAndPassword(this.auth, data.email, data.password).then(() => {
      this.router.navigate(['/dashboard'])
    })
  }

  signUp(data: AuthUserCredential) {
    createUserWithEmailAndPassword(this.auth, data.email, data.password).then(() => {
      this.router.navigate(['/dashboard'])
    })
  }

  logout() {
    signOut(this.auth)
    this.router.navigate(['/login'])
  }
}
