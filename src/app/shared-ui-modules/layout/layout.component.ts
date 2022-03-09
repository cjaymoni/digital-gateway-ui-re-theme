import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { RouterOutlets } from 'src/app/config/app-config';
import { LocalStorageService } from 'src/app/helpers/localstorage.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ThemeSettingsService } from 'src/app/services/theme-settings.service';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';
import { AppAlertService } from '../alerts/service/app-alert.service';
import { ModalComponentsComponent } from '../modal-components/modal-components.component';

const SHOW_PANEL = 'show_panel';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ThemeSettingsStore],
})
export class LayoutComponent implements OnInit, OnDestroy {
  loading$ = this.themeService.loadingHomepageData$;

  RouterOutlets = RouterOutlets;

  modalActiveSubcription$!: Subscription;

  modalActive$ = this.navigator.modalActive$;

  modalRef!: DynamicDialogRef;

  breadcrumbs$ = this.navigator.breadCrumbs$;

  showRightPanel$ = new BehaviorSubject(true);

  home = {
    routerLink: ['/'],
    title: 'Go To Home',
    icon: 'pi pi-home',
  };

  constructor(
    private appAlert: AppAlertService,
    private navigator: NavigatorService,
    private themeService: ThemeSettingsService,
    private cookieService: CookieService,
    private localStorage: LocalStorageService
  ) {
    let showPanel: any = this.cookieService.get(SHOW_PANEL);

    if (typeof showPanel !== 'string') {
      showPanel = this.localStorage.getItem(SHOW_PANEL);
    }

    const boolean = showPanel && showPanel === 'true';

    this.showRightPanel$.next(boolean);
  }

  ngOnDestroy(): void {
    this.modalActiveSubcription$?.unsubscribe();
  }

  ngOnInit(): void {
    this.modalActiveSubcription$ = this.modalActive$
      .pipe(
        tap(active => {
          if (active) {
            this.navigator.setModalRef(
              this.appAlert.openDialog(ModalComponentsComponent, {
                closable: false,
                closeOnEscape: false,
                styleClass:
                  'w-screen md:w-9 h-screen md:h-auto px-4 pb-4 no-dialog-header bg-white',
                modal: true,
                showHeader: false,
                dismissableMask: false,
              })
            );
          }
        })
      )
      .subscribe();
  }

  toggleRightPanel() {
    const next = !this.showRightPanel$.getValue();

    this.showRightPanel$.next(next);
    this.cookieService.put(SHOW_PANEL, `${next}`);
    this.localStorage.setItem(SHOW_PANEL, `${next}`);
  }
}
