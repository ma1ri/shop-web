import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.url}api/users`;
  private authenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  //todo: add auth logic

  isAuthenticated() {
    return this.authenticated;
  }

  signup(user: User) {
    return this.http.post<User>(this.apiUrl + '/signup', user).pipe(
      tap((res) => {
        this.authenticated = true;
      })
    );
  }

  updateUser(userId: string, user: User) {
    return this.http.put<User>(this.apiUrl + '/' + userId, user);
  }

  getUserDetails(userId: string) {
    return this.http.get<User>(this.apiUrl + '/' + userId);
  }
}
