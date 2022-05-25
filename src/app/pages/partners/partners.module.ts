import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersFormModule } from './partners-form/partners-form.module';
import { PartnersListModule } from './partners-list/partners-list.module';

@NgModule({
  imports: [
    CommonModule,
    PartnersRoutingModule,
    PartnersFormModule,
    PartnersListModule,
  ],
  declarations: []
})
export class PartnersModule { }
