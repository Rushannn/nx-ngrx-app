import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket, selectOpenedTicket } from '@mycab/tickets/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { TicketDetailStore } from './ticket-detail.store';


@Component({
  selector: 'lib-ticket-detail',
  standalone: true,
  providers: [provideNativeDateAdapter(), TicketDetailStore],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent implements OnInit {

  private readonly id = input<number>(0);
  private readonly ticketDetailStore = inject(TicketDetailStore);

  readonly ticket = this.ticketDetailStore.ticket;

  ngOnInit(): void {
    this.ticketDetailStore.getTicket(this.id());
    console.log('id', this.id());
    console.log('ticket', this.ticket());
  }

  editing = signal(false);

  onDeadlineChange(newDate: string) {
    console.log('New deadline:', newDate);
  }

  onCompletedChange(event: any) {
    console.log('Completed status:', event.checked);
  }
}
