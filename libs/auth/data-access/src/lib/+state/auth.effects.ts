import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';

export const logoutOrGetMeFailure$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logout, authActions.getMeFailure),
      tap(() => {
        localStorageJwtService.removeItem();
        router.navigateByUrl('login');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(
        ({ credentials }) =>
          authService.login(credentials)
            .pipe(
              map(({ data }) => {
                return authActions.loginSuccess({ user: data })
              }),
              catchError(error => of(authActions.loginFailure({ error })))
            )
      )
    );
  },
  { functional: true },
);

export const loginSuccess$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap((action) => {
        localStorageJwtService.setItem(action.user.auth_token);
        router.navigateByUrl('/');
      })
    )
  },
  { functional: true, dispatch: false },
);

export const getMe$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.getMe),
      switchMap(
        () =>
          authService.getMe()
            .pipe(
              map((data) => {
                return authActions.getMeSuccess({ user: data })
              }),
              catchError(error => of(authActions.getMeFailure({ error })))
            )
      )
    );
  },
  { functional: true },
);
