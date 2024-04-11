import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
    // { path: '', component: WelcomeComponent },
    { path:'', component: DashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    { path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    { path: 'login', component: LoginComponent },
    { path: 'editor', redirectTo: 'editor/new' },
    { path: 'editor/:doc', component: EditorComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
];
