import { Route } from '@angular/router';
import { authGuard } from '@mycab/auth/data-access';

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
    canActivate: [authGuard],
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
    canActivate: [authGuard],
  },
  {
    path: 'ticket',
    loadChildren: () => import('@mycab/tickets/ticket-detail').then((m)=> m.TICKET_DEATIL_ROUTES),
    data: { breadcrumb: 'ticket' },
    canActivate: [authGuard],
  },
];
