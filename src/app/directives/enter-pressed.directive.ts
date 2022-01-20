import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[enterPressed]',
})
export class EnterPressedDirective {
  @Output() onEnterPressed = new EventEmitter();

  constructor(private element: ElementRef) {
    this.element.nativeElement.onkeyup = (key: KeyboardEvent) => {
      if (key.key === 'Enter') return this.onEnterPressed.emit();
    };
  }
}
