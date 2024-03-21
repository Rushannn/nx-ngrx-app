import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ticketsActions, ticketsFeature } from '@mycab/tickets/data-access';
import { TicketsItemComponent } from './tickets-item/tickets-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-tickets',
  standalone: true,
  imports: [
    CommonModule,
    TicketsItemComponent
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  tickets$ = this.store.select(ticketsFeature.selectEntities);
  loading$ = this.store.select(ticketsFeature.selectLoading);

  ngOnInit(): void {
    this.store.dispatch(ticketsActions.getTickets())
  }

  redirectToTicket(ticketId: number) {
    this.router.navigate(['/ticket', ticketId]);
  }
}
