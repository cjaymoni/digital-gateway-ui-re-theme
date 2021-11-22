import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[clickable]',
})
export class AppClickableDirective {
  constructor(private element: ElementRef) {
    element.nativeElement.style.cursor = 'pointer';
  }
}
