import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'tickets',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () => import('@mycab/profile/feature-profile').then((m) => m.ProfileComponent),
    data: { breadcrumb: 'profile' },
  },
  {
    path: 'login',
    loadComponent: () => import('@mycab/auth/feature-auth').then((m) => m.LoginComponent),
    data: { breadcrumb: 'login' },
  },
  {
    path: 'tickets',
    loadComponent: () => import('@mycab/tickets/feature-tickets').then((m) => m.TicketsComponent),
    data: { breadcrumb: 'tickets' },
  },
];
