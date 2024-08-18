import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const token daamate tokenis wamoghebis logika
    this.authService.isLoading.next(true);
    const token = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    return next
      .handle(authReq)
      .pipe(finalize(() => this.authService.isLoading.next(false)));
  }
}
