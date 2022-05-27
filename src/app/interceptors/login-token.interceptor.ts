import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_TOKEN, LOGIN_PATH } from 'src/app/config/app-config';
import { LocalStorageService } from '../helpers/localstorage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginTokenInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const idToken = this.localStorage.getItem(APP_TOKEN) || '';
    if (
      request.url.includes(environment.API_URL) &&
      !request.url.toLocaleLowerCase().includes(LOGIN_PATH) &&
      idToken
    ) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${idToken}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}

