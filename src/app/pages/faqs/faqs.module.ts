import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsViewModule } from './faqs-view/faqs-view.module';
import { FaqsRoutesModule } from './faqs-routing.module';

@NgModule({
  imports: [CommonModule, FaqsViewModule, FaqsRoutesModule],
  declarations: [],
})
export class FaqsModule {}

