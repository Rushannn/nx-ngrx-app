import { Injectable, inject } from "@angular/core";
import { Ticket, TicketsService, selectOpenedTicket, ticketsActions } from "@mycab/tickets/data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { toSignal } from "@angular/core/rxjs-interop";
import { EMPTY, switchMap, tap } from "rxjs";
import { concatLatestFrom } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";

type Status = 'init' | 'loading' | 'loaded';

export interface TicketDetailState {
  ticket?: Ticket
  status: Status
}

const ticketDetailStateInit: TicketDetailState = {
  status: 'init'
}

@Injectable()
export class TicketDetailStore extends ComponentStore<TicketDetailState>{
  private readonly store = inject(Store);
  private readonly ticketService = inject(TicketsService);
  selectedTicket$ = this.store.select(selectOpenedTicket);


  constructor() { super(ticketDetailStateInit) }

  readonly ticket = toSignal(this.select((state) => state.ticket));
  readonly status = toSignal(this.select((state) => state.status));

  private updateStatus(status: Status) {
    this.patchState({
      status
    })
  }

  private setTicket(ticket: Ticket) {
    this.patchState({
      ticket
    })
  }

  readonly getTicket = this.effect<number>((id$) =>
    id$.pipe(
      tap(() => this.updateStatus('loading')),
      concatLatestFrom(() => this.selectedTicket$),
      switchMap(([id, ticket]) => {
        if (ticket) {
          this.setTicket(ticket);
          this.updateStatus('loaded');
          return EMPTY;
        } else {
          return this.ticketService.getTicket(id)
            .pipe(
              tapResponse({
                next: (ticket) => this.setTicket(ticket),
                error: (error: HttpErrorResponse) => console.log(error),
                finalize: () => this.updateStatus('loaded'),
              })
            )
        }
      })
    )
  )
}


