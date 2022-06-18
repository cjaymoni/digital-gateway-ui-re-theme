import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsViewComponent } from './about-us-view.component';
import { PartnersViewModule } from 'src/app/shared-ui-modules/partners/partners-view.module';

@NgModule({
  declarations: [AboutUsViewComponent],
  imports: [CommonModule, PartnersViewModule],
  exports: [AboutUsViewComponent],
})
export class AboutUsViewModule {}

