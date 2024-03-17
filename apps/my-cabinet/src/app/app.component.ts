import { TuiRootModule, TuiDialogModule, TuiAlertModule } from "@taiga-ui/core";
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { Store } from "@ngrx/store";
import { LocalStorageJwtService, authActions, selectLoggedIn, selectUser } from "@mycab/auth/data-access";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    HeaderComponent
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
export class AppComponent {
  private readonly store = inject(Store);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);

  user = toSignal(this.store.select(selectUser));
  isLoggedIn = toSignal(this.store.select(selectLoggedIn), { initialValue: false });

  onLogout(){
    this.store.dispatch(authActions.logout());
  }
}
