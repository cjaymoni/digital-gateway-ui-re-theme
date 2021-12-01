import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumListComponent } from './forum-list.component';
import { ForumPostCardModule } from '../../../shared-ui-modules/forum-post-card/forum-post-card.module';
import { ListingPageModule } from 'src/app/shared-ui-modules/listing-page/listing-page.module';

@NgModule({
  imports: [CommonModule, ForumPostCardModule, ListingPageModule],
  declarations: [ForumListComponent],
  exports: [ForumListComponent],
})
export class ForumListModule {}
