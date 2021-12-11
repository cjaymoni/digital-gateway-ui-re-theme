import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppClickableDirective } from './clickable.directive';
import { AppClickConfirmDirective } from './click-confirm.directive';
import { AppProceedIfLoggedDirective } from './click-if-logged-in.directive';
import { AppAutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    AppClickableDirective,
    AppClickConfirmDirective,
    AppProceedIfLoggedDirective,
    AppAutofocusDirective,
  ],
  imports: [CommonModule],
  exports: [
    AppClickableDirective,
    AppClickConfirmDirective,
    AppProceedIfLoggedDirective,
    AppAutofocusDirective,
  ],
})
export class DirectivesModule {}
