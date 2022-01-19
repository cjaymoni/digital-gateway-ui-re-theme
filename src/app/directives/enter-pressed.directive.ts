import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[enterPressed]',
})
export class EnterPressedDirective {
  @Output() onEnterPressed = new EventEmitter();

  constructor(private element: ElementRef) {
    this.element.nativeElement.onkeyup = (key: KeyboardEvent) => {
      console.log('pressed');

      if (key.key === 'Enter') return this.onEnterPressed.emit();
    };
  }
}
