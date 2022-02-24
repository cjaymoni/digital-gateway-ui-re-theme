import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalLinkListModule } from './digital-link-list/digital-link-list.module';
import { DigitalLinkFormModule } from './digital-link-form/digital-link-form.module';
import { DigitalLinksRoutingModule } from './digital-links-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DigitalLinksRoutingModule,
    DigitalLinkFormModule,
    DigitalLinkListModule,
  ],
  declarations: []
})
export class DigitalLinksModule { }
