import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsViewModule } from './about-us-view/about-us-view.module';
import { AboutUsRoutesModule } from './about-us-routes.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AboutUsRoutesModule,
    AboutUsViewModule,
  ],
  exports: [],
})
export class AboutUsModule {}
