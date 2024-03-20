import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '@mycab/tickets/data-access';

@Component({
  selector: 'lib-tickets-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets-item.component.html',
  styleUrl: './tickets-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsItemComponent {
  @Input() ticket!: Ticket;
}
