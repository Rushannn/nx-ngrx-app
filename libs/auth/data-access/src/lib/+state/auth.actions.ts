import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { UserData } from '../models/user';
import { LoginUser } from '../models/loginUser';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    getMe: emptyProps(),
    getMeFailure: props<{ error: Error }>(),
    getMeSuccess: props<{ user: UserData }>(),
    login: props<{ credentials: LoginUser }>(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ user: UserData }>(),
    logout: emptyProps(),
  },
});
