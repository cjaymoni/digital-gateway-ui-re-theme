import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqSettingsComponent } from './faq-settings.component';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
@NgModule({
  imports: [CommonModule, OrderListModule, ButtonModule],
  declarations: [FaqSettingsComponent],
})
export class FaqSettingsModule {}

