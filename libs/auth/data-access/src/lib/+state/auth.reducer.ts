import { createFeature, createReducer, on } from "@ngrx/store"
import { UserData } from "../models/user"
import { authActions } from "./auth.actions"

export interface AuthState {
  loggedIn: boolean
  user: UserData
  status: Status
}

export enum Status {
  INIT = 'INIT',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const authInitialState: AuthState = {
  loggedIn: false,
  status: Status.INIT,
  user: {
    id: 0,
    username: '',
    name: '',
    surname: '',
    birthday: '',
    city: '',
    auth_token: '',
  }
}

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(authActions.login, authActions.getMe, (state): AuthState => ({
      ...state,
      status: Status.IN_PROGRESS
    })),
    on(authActions.getMeFailure, authActions.logout, (): AuthState => authInitialState),
    on(authActions.loginSuccess, authActions.getMeSuccess, (state, action): AuthState => ({
      ...state,
      loggedIn: true,
      user: action.user
    })),
    on(authActions.loginFailure, (state): AuthState => ({
      ...state,
      status: Status.INIT
    })),
  )
});
