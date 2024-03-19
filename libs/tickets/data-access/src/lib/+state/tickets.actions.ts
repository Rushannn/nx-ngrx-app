import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Ticket } from "../models/ticket";

export const ticketsActions = createActionGroup({
  source: 'Tickets',
  events: {
    getTickets: emptyProps(),
    getTicketsFailure: props<{ error: Error }>(),
    getTicketsSuccess: props<{ tickets: Ticket[] }>(),
    getTicket: props<{ id: number }>(),
    getTicketFailure: props<{ error: Error }>(),
    getTicketSuccess: props<{ ticket: Ticket }>(),
  },
});
