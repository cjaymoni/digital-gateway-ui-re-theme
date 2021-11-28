import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppClickableDirective } from './clickable.directive';
import { AppClickConfirmDirective } from './click-confirm.directive';

@NgModule({
  declarations: [AppClickableDirective, AppClickConfirmDirective],
  imports: [CommonModule],
  exports: [AppClickableDirective, AppClickConfirmDirective],
})
export class DirectivesModule {}
