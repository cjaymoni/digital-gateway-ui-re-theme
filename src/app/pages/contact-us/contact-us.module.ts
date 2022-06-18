import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsRoutesModule } from './contact-us-routes.module';
import { ContactUsFormModule } from './contact-us-form/contact-us-form.module';

@NgModule({
  imports: [CommonModule, ContactUsRoutesModule, ContactUsFormModule],
  declarations: [],
})
export class ContactUsModule {}

