import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-tickets-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets-item.component.html',
  styleUrl: './tickets-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsItemComponent {}
