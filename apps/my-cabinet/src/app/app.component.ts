import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { Store } from "@ngrx/store";
import { LocalStorageJwtService, authActions, selectLoggedIn, selectUser } from "@mycab/auth/data-access";
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, take } from "rxjs";

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
  ],
  selector: 'app-root',
  template: `

  @if(isLoggedIn()){
    <app-header [user]="user()" (logout)="onLogout()"></app-header>
  }
  <router-outlet></router-outlet>

  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  private readonly store = inject(Store);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);

  user = toSignal(this.store.select(selectUser));
  isLoggedIn = toSignal(this.store.select(selectLoggedIn), { initialValue: false });

  onLogout() {
    this.store.dispatch(authActions.logout());
  }

  ngOnInit(): void {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token),
      )
      .subscribe(() => this.store.dispatch(authActions.getMe()));
  }
}

