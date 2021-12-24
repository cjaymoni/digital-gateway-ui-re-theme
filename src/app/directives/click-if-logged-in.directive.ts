import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import { PrimeNgAlerts, RouterOutlets } from '../config/app-config';
import { NavigatorService } from '../services/navigator.service';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';
import { userAuthSelectors } from '../store/selectors/user-auth.selectors';

@Directive({
  selector: '[proceedIfLoggedIn]',
})
export class AppProceedIfLoggedDirective {
  @Output() onProceed = new EventEmitter();

  loggedInUser$ = this.store.select(userAuthSelectors.loggedInUser);

  constructor(
    private element: ElementRef,
    private alert: AppAlertService,
    private store: Store,
    private navigator: NavigatorService
  ) {
    this.element.nativeElement.onclick = (event: MouseEvent) => {
      this.loggedInUser$
        .pipe(
          withLatestFrom(this.navigator.panelActive$),
          tap(([user, panelActive]) => {
            if (user) {
              return this.onProceed.emit();
            } else {
              this.alert.showToast(
                'You need to log in to perform this action',
                PrimeNgAlerts.INFO
              );
              const outlet = panelActive
                ? RouterOutlets.Modal
                : RouterOutlets.Right;
              this.navigator.auth.goToLogin(outlet);
            }
          })
        )
        .subscribe();
    };
  }
}
