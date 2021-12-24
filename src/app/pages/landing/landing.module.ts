import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LayoutModule } from './layout/layout.module'

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    LayoutModule,
  ],
  declarations: []
})
export class LandingModule { }
