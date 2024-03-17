import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '@mycab/auth/data-access';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
  <header class="app-header">
    <div class="app-title">MyCabinet</div>
    <nav class="navigation">
      <a href="/profile" class="nav-link">Profile</a>
      <a href="/tickets" class="nav-link">Tickets</a>
    </nav>
    <button class="logout-button" (click)="logout.emit()">Logout</button>
  </header>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly user = input<UserData>();

  @Output() logout = new EventEmitter<void>();
}
