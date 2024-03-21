import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Profile, ProfileService } from "@mycab-profile-data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { filter, switchMap, tap } from "rxjs";

type Status = 'init' | 'loading' | 'loaded';

export interface ProfileState {
  profile?: Profile
  status: Status
}

const profileStateInit: ProfileState = {
  status: 'init'
}


@Injectable()
export class ProfileStore extends ComponentStore<ProfileState> {
  private readonly profileService = inject(ProfileService);

  constructor() {
    super(profileStateInit)
  }

  readonly profile = toSignal(this.select((state) => state.profile));
  readonly status = toSignal(this.select((state) => state.status));

  private updateStatus(status: Status) {
    this.patchState({
      status
    })
  }

  private setProfile(profile: Profile) {
    this.patchState({
      profile
    })
  }

  readonly getProfile = this.effect<number | undefined>((id$) =>
    id$.pipe(
      filter((id): id is number => !!id),
      tap(() => this.updateStatus('loading')),
      switchMap((id) =>
        this.profileService.getProfile(id).pipe(
          tapResponse({
            next: (profile) => this.setProfile(profile),
            error: (error: HttpErrorResponse) => console.log(error.message),
            finalize: () => this.updateStatus('loaded'),
          }))
      ),
    )
  );
}
