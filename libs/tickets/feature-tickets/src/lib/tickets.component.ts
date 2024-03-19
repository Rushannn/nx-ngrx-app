import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ticketsActions } from '@mycab/tickets/data-access';

@Component({
  selector: 'lib-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit{
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(ticketsActions.getTickets())
  }


}
