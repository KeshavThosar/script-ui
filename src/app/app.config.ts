import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyDdWpJ95rgu-jhPZx8oR0kaIxqKmgEtYAk",
  authDomain: "scriptui.firebaseapp.com",
  projectId: "scriptui",
  storageBucket: "scriptui.appspot.com",
  messagingSenderId: "644224244650",
  appId: "1:644224244650:web:891426a2c13b97b9f969d3"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ]
};
