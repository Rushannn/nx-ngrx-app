import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { UserData, UserResponse } from '../models/user';
import { LoginUser } from '../models/loginUser';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    getUser: emptyProps(),
    getUserFailure: props<{ error: Error }>(),
    getUserSuccess: props<{ user: UserResponse }>(),
    login: props<{ credentials: LoginUser }>(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ data: UserData }>(),
    logout: emptyProps(),
  },
});
