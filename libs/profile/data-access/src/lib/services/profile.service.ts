import { Injectable, inject } from "@angular/core";
import { ApiService } from "@mycab/core/http-client";
import { Observable } from "rxjs";
import { Profile } from "../models/profile";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly apiService = inject(ApiService);

  getProfile(userId: number): Observable<Profile> {
    return this.apiService.get<Profile>(`/users/${userId}`);
  }

}
