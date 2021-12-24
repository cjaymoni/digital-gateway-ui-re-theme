import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumListComponent } from './forum-list.component';
import { ListingPageModule } from 'src/app/shared-ui-modules/listing-page/listing-page.module';
import { ForumCardModule } from '../../../shared-ui-modules/forum-card/forum-card.module';

@NgModule({
  imports: [CommonModule, ForumCardModule, ListingPageModule],
  declarations: [ForumListComponent],
  exports: [ForumListComponent],
})
export class ForumListModule {}
