import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "../environments/environment";
import { API_URL } from "@mycab/core/http-client";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),
    importProvidersFrom(TuiRootModule),
    provideHttpClient(),
    !environment.production ? provideStoreDevtools() : [],
    { provide: API_URL, useValue: environment.api_url },
    // provideStore(),
    // provideEffects(),
],
};
