import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumDetailsComponent } from './forum-details.component';
import { OpenedForumCardModule } from '../opened-forum-card/opened-forum-card.module';

@NgModule({
  imports: [CommonModule, OpenedForumCardModule],
  declarations: [ForumDetailsComponent],
  exports: [ForumDetailsComponent],
})
export class ForumDetailsModule {}
