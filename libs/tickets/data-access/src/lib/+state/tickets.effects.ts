import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TicketsService } from "../services/tickets.service";
import { inject } from "@angular/core";
import { ticketsActions } from "./tickets.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";

export const getTickets$ = createEffect(
  (actions$ = inject(Actions), ticketsService = inject(TicketsService)) => {
    return actions$.pipe(
      ofType(ticketsActions.getTickets),
      tap(() => console.log('getTickets effect')),
      switchMap(
        () => ticketsService.getTickets().pipe(
          map((responce) => ticketsActions.getTicketsSuccess({ tickets: responce })),
          catchError((error) => of(ticketsActions.getTicketsFailure(error))),
        ),
      ),
    );
  }, { functional: true },
);
