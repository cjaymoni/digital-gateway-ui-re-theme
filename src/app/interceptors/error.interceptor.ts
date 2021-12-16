import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigatorService } from '../services/navigator.service';
import {
  APP_TOKEN,
  APP_USER_TOKEN,
  PrimeNgAlerts,
} from 'src/app/config/app-config';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';

@Injectable()
export class ErrorMessageInterceptor implements HttpInterceptor {
  constructor(
    private alert: AppAlertService,
    private navigator: NavigatorService
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
              messageArray.forEach(m => {
                errorMessages += `\n${m}`;
              });
              // }
            }
            //  const messages = Object.keys(event.error.messages)
            this.alert.showToast(
              `Validation Error. \n ${errorMessages}`,
              PrimeNgAlerts.ERROR
            );
          }
        }

        if (event.status === 401) {
          this.alert.showToast(
            event.error.message ||
              `You have been logged out. Please log in and retry`,
            PrimeNgAlerts.ERROR
          );
          localStorage.removeItem(APP_TOKEN);
          localStorage.removeItem(APP_USER_TOKEN);
          this.navigator.auth.goToLogin();
        }

        if (event.status === 403) {
          this.alert.showToast(
            `Sorry you are not permitted to perform this function. See administrator`,
            PrimeNgAlerts.ERROR
          );
        }

        if (event.error?.message && event.status >= 500) {
          this.alert.showToast(
            `An error occured. Rest assured, it will be rectified soon.`,
            PrimeNgAlerts.ERROR
          );
        }
        return throwError(event.error);
      })
    );
  }
}
