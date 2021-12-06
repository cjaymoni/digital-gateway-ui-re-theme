import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, tap } from 'rxjs';
import { PrimeNgAlerts, RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AppAlertService } from '../alerts/service/app-alert.service';
import { ModalComponentsComponent } from '../modal-components/modal-components.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  RouterOutlets = RouterOutlets;

  modalActiveSubcription$!: Subscription;

  modalRef!: DynamicDialogRef;

  constructor(
    private appAlert: AppAlertService,
    private navigator: NavigatorService
  ) {}

  ngOnDestroy(): void {
    this.modalActiveSubcription$?.unsubscribe();
  }

  ngOnInit(): void {
    this.modalActiveSubcription$ = this.navigator.modalActive$
      .pipe(
        tap(active => {
          if (active) {
            this.modalRef = this.appAlert.openDialog(ModalComponentsComponent, {
              closable: false,
              closeOnEscape: false,
              styleClass:
                'w-screen md:w-9 h-screen md:h-7 px-4 pb-4 no-dialog-header bg-white',
              modal: true,
              showHeader: false,
              dismissableMask: false,
            });
          } else {
            this.modalRef?.close();
          }
        })
      )
      .subscribe();
  }
}
