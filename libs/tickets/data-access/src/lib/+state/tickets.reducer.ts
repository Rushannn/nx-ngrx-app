import { createFeature, createReducer, on } from "@ngrx/store";
import { Ticket } from "../models/ticket";
import { ticketsActions } from "./tickets.actions";

export interface TicketsState {
  tickets: Ticket[]
  loading: boolean
  loaded: boolean
}

const ticketsInitState: TicketsState = {
  tickets: [],
  loading: false,
  loaded: false
}

export const ticketsFeature = createFeature({
  name: 'tickets',
  reducer: createReducer(
    ticketsInitState,
    on(ticketsActions.getTickets, (state): TicketsState => ({
      ...state,
      loading: true
    })),
    on(ticketsActions.getTicketsSuccess, (state, action): TicketsState => ({
      tickets: action.tickets,
      loading: false,
      loaded: true
    })),
    on(ticketsActions.getTicketsFailure, (state): TicketsState => ({
      ...state,
      loading: false,
      loaded: true
    })),
  )
});
