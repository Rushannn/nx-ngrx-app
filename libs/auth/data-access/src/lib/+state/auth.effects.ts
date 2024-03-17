import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';

export const logout$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logout),
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
                return authActions.loginSuccess({ data })
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
        localStorageJwtService.setItem(action.data.auth_token);
        router.navigateByUrl('/');
      })
    )
  },
  { functional: true, dispatch: false },
);
