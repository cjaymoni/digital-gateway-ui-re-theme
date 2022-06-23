import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsViewModule } from './faqs-view/faqs-view.module';
import { FaqsRoutesModule } from './faqs-routing.module';
import { FaqListModule } from './faqs-management/faq-list/faq-list.module';
import { FaqFormModule } from './faqs-management/faq-form/faq-form.module';

@NgModule({
  imports: [
    CommonModule,
    FaqsViewModule,
    FaqsRoutesModule,
    FaqListModule,
    FaqFormModule,
  ],
  declarations: [],
})
export class FaqsModule {}

