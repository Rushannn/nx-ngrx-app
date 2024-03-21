import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "../environments/environment";
import { API_URL } from "@mycab/core/http-client";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authEffects, authFeature, tokenInterceptor } from "@mycab/auth/data-access";
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { ticketsEffects, ticketsFeature } from "@mycab/tickets/data-access";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: ([
    provideAnimations(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    { provide: API_URL, useValue: environment.api_url },
    provideStore({
      auth: authFeature.reducer,
      tickets: ticketsFeature.reducer,
      router: routerReducer
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    provideEffects(authEffects, ticketsEffects),
    provideRouterStore(),
    provideAnimationsAsync(),
  ]),
};
