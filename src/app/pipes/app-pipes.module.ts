import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEllipsis } from './ellipsis.pipe';

@NgModule({
  declarations: [AppEllipsis],
  imports: [CommonModule],
  exports: [AppEllipsis],
})
export class AppPipesModule {}
