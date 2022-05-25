import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectLinksComponent } from './direct-links.component';
import { ListingPageModule } from 'src/app/shared-ui-modules/listing-page/listing-page.module';
import { DirectLinksCardModule } from 'src/app/shared-ui-modules/direct-links-card/direct-links-card.module';

@NgModule({
  imports: [
    CommonModule,
    ListingPageModule,
    DirectLinksCardModule,
  ],
  declarations: [DirectLinksComponent],
  exports: [DirectLinksComponent],
})
export class DirectLinksModule { }
