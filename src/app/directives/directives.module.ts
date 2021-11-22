import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppClickableDirective } from './clickable.directive';

@NgModule({
  declarations: [AppClickableDirective],
  imports: [CommonModule],
  exports: [AppClickableDirective],
})
export class DirectivesModule {}
