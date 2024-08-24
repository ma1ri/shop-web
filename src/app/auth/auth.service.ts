import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.url}api/users`;
  private authenticated: boolean = false;
  private token!: string | null;
  private tokenTimer: any;
  private userId!: string | null;
  private authStatusListener = new BehaviorSubject<boolean>(this.authenticated);
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  //todo: add auth logic

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.authenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signup(user: User) {
    return this.http.post<User>(this.apiUrl + '/signup', user).pipe(
      tap((res) => {
        this.authenticated = true;
      })
    );
  }

  login(params: any) {
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        this.apiUrl + '/login',
        params
      )
      .pipe(
        tap((response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.authenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        }),
        catchError((err) => {
          this.authStatusListener.next(false);
          return err;
        })
      );
  }

  updateUser(userId: string, user: User | FormData) {
    return this.http.put<User>(this.apiUrl + '/' + userId, user);
  }

  getUserDetails(userId: string) {
    return this.http.get<User>(this.apiUrl + '/' + userId);
  }

  autoAuthUser() {
    console.log('ავტომატურად დაალოგინე');
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.authenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.authenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
