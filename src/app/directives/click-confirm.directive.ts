import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';

@Directive({
  selector: '[clickConfirmation]',
})
export class AppClickConfirmDirective {
  @Output() onConfirm = new EventEmitter();

  constructor(private element: ElementRef, private alert: AppAlertService) {
    this.element.nativeElement.onclick = (event: MouseEvent) => {
      this.alert.showConfirmation({
        popupTarget: element.nativeElement,
        acceptFunction: () => {
          this.onConfirm.emit();
        },
      });
    };
  }
}
