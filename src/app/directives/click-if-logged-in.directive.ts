import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { PrimeNgAlerts } from '../config/app-config';
import { NavigatorService } from '../services/navigator.service';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';
import { userAuth } from '../store/selectors/user-auth.selectors';

@Directive({
  selector: '[proceedIfLoggedIn]',
})
export class AppProceedIfLoggedDirective {
  @Output() onProceed = new EventEmitter();

  loggedInUser$ = this.store.select(userAuth);

  constructor(
    private element: ElementRef,
    private alert: AppAlertService,
    private store: Store,
    private navigator: NavigatorService
  ) {
    this.element.nativeElement.onclick = (event: MouseEvent) => {
      this.loggedInUser$
        .pipe(
          tap(user => {
            if (user?.id) {
              return this.onProceed.emit();
            } else {
              this.alert.showToast(
                'You need to log in to perform this action',
                PrimeNgAlerts.INFO
              );
              return this.navigator.auth.goToLogin();
            }
          })
        )
        .subscribe();
    };
  }
}
