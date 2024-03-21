import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '@mycab/auth/data-access';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary" class="app-header">
      <span class="app-title">MyCabinet</span>
      <span class="navigation">
        <a mat-button [routerLink]="['/profile', user()!.id]">Profile</a>
        <a mat-button [routerLink]="['/tickets']">Tickets</a>
      </span>
      <button mat-button class="logout-button" (click)="logout.emit()">Logout</button>
    </mat-toolbar>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly user = input<UserData>();

  @Output() logout = new EventEmitter<void>();
}
