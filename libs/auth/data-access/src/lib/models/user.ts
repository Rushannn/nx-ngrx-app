export interface UserData {
  id: number;
  username: string;
  name: string;
  surname: string;
  birthday: string;
  city: string;
  auth_token: string;
}

export interface UserResponse {
  data: UserData;
}
