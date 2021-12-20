import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ResourceListComponent } from './resource-list.component';
import { ListingPageModule } from 'src/app/shared-ui-modules/listing-page/listing-page.module';
import { ResourceCardModule } from '../resource-card/resource-card.module';

@NgModule({
  imports: [
    CommonModule,
    ResourceCardModule,
    ListingPageModule,
    ButtonModule,
  ],
  exports: [ResourceListComponent],
  declarations: [ResourceListComponent]
})
export class ResourceListModule { }
