import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AppAutofocusDirective {
  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    if (document.activeElement) {
      (document.activeElement as any).blur();
    }

    this.host.nativeElement.focus();
  }
}
