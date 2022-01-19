import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEllipsis } from './ellipsis.pipe';
import { BooleanPipe } from './boolean.pipe';

@NgModule({
  declarations: [AppEllipsis, BooleanPipe],
  imports: [CommonModule],
  exports: [AppEllipsis, BooleanPipe],
})
export class AppPipesModule {}
