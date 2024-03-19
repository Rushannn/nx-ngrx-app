import { Injectable, inject } from "@angular/core";
import { ApiService } from "@mycab/core/http-client"
import { LoginUser } from "../models/loginUser";
import { Observable } from "rxjs";
import { UserData, UserResponse } from "../models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUser>('/auth/login', credentials);
  }

  getMe(): Observable<UserData> {
    return this.apiService.get<UserData>('/auth/me',);
  }
}
