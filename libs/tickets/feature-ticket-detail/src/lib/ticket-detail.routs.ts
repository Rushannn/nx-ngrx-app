import { Routes } from '@angular/router';
import { TicketDetailComponent } from './ticket-detail.component';
export const TICKET_DEATIL_ROUTES: Routes = [
  {
    path: ':id',
    component: TicketDetailComponent,
  },
];
