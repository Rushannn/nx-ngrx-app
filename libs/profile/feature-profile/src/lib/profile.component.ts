import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileStore } from './profile.store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CITIES } from '@mycab-profile-data-access';

@Component({
  selector: 'lib-profile',
  standalone: true,
  providers: [ProfileStore],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {

  private readonly id = input<number>(0);
  private readonly profileState = inject(ProfileStore)

  public readonly profileData = this.profileState.profile;
  public readonly status = this.profileState.status;
  public readonly cities = CITIES;

  ngOnInit(): void {
    this.profileState.getProfile(this.id());
  }

  onCityChange(event: any) {
    console.log('City changed to:', event.value);
  }
}
