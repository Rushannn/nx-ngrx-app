import { createSelector } from "@ngrx/store";
import { ticketsFeature } from "./tickets.reducer";
import { selectRouteParams } from "@mycab/core/router-store";

export const { selectTicketsState, selectEntities, selectLoaded, selectLoading } = ticketsFeature;

export const selectOpenedTicket = createSelector(
  selectRouteParams,
  selectEntities,
  ({ id }, entities) => entities[id] || null
);

