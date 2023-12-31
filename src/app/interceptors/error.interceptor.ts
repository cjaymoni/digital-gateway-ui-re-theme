import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { catchError, Observable, throwError } from 'rxjs';
import {
  APP_REFRESH_TOKEN,
  APP_TOKEN,
  APP_USER_TOKEN,
  PrimeNgAlerts,
} from 'src/app/config/app-config';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../helpers/localstorage.service';
import { NavigatorService } from '../services/navigator.service';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';

@Injectable()
export class ErrorMessageInterceptor implements HttpInterceptor {
  constructor(
    private alert: AppAlertService,
    private navigator: NavigatorService,
    private localStorage: LocalStorageService,
    private cookieService: CookieService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((event: any) => {
        if (event.status === 400) {
          const validationError = event.error;

          if (typeof validationError === 'object') {
            let errorMessages = '';
            for (const key in validationError) {
              // if (Object.prototype.hasOwnProperty.call(validationError, key)) {
              // errorMessages += `\n${key.replace(/_/g, ' ').toUpperCase()} : `;
              const messageArray: string[] = validationError[key];
              // errorMessages += key + ' => ';
              messageArray.forEach(m => {
                errorMessages += `\n${m}`;
              });
              // }
            }
            //  const messages = Object.keys(event.error.messages)
            this.alert.showToast(`${errorMessages}`, PrimeNgAlerts.ERROR);
          } else {
            this.alert.showToast(validationError, PrimeNgAlerts.ERROR);
          }
        } else if (
          event.status === 401 &&
          request.url.includes(environment.API_URL)
        ) {
          if (this.cookieService.hasKey(APP_REFRESH_TOKEN)) {
          }

          this.alert.showToast(
            event.error.message ||
              `You have been logged out. Please log in and retry`,
            PrimeNgAlerts.ERROR
          );

          this.localStorage.removeItem(APP_TOKEN);
          this.localStorage.removeItem(APP_USER_TOKEN);
          this.cookieService.removeAll();
          this.navigator.auth.goToLogin();
        } else if (event.status === 403) {
          const message = event.error || 'You are not authorized';
          this.alert.showToast(message, PrimeNgAlerts.ERROR);
        } else if (event.error?.message && event.status >= 500) {
          this.alert.showToast(
            `An error occured. Rest assured, it will be rectified soon.`,
            PrimeNgAlerts.ERROR
          );
        }
        // else {
        //   this.alert.showToast(
        //     `An error occured. Try again later`,
        //     PrimeNgAlerts.ERROR
        //   );
        // }

        return throwError(() => event);
      })
    );
  }
}

