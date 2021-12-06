import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppClickableDirective } from './clickable.directive';
import { AppClickConfirmDirective } from './click-confirm.directive';
import { AppProceedIfLoggedDirective } from './click-if-logged-in.directive';

@NgModule({
  declarations: [
    AppClickableDirective,
    AppClickConfirmDirective,
    AppProceedIfLoggedDirective,
  ],
  imports: [CommonModule],
  exports: [
    AppClickableDirective,
    AppClickConfirmDirective,
    AppProceedIfLoggedDirective,
  ],
})
export class DirectivesModule {}
