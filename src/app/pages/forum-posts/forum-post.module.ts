import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ForumPostRoutesModule } from './forum-post-routes.module';
import { MyForumPostsModule } from './my-forum-posts/my-forum-posts.module';
import { ForumPostDetailsModule } from '../../shared-ui-modules/forum-post-details/forum-post-details.module';
import { ForumPostFormModule } from 'src/app/shared-ui-modules/forum-post-form/forum-post-form.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ForumPostRoutesModule,
    MyForumPostsModule,
    HttpClientModule,
    ForumPostDetailsModule,
    ForumPostFormModule,
  ],
})
export class ForumPostModule {}
