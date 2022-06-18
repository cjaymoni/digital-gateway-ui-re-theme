import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsViewComponent } from './faqs-view.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  imports: [CommonModule, AccordionModule],
  declarations: [FaqsViewComponent],
  exports: [FaqsViewComponent],
})
export class FaqsViewModule {}

