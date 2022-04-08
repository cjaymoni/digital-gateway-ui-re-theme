import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyForumPostsComponent } from './my-forum-posts.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { AppHeadingModule } from 'src/app/shared-ui-modules/app-heading/app-heading.module';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
    MessageModule,
    TagModule,
    AppHeadingModule,
  ],
  declarations: [MyForumPostsComponent],
  exports: [MyForumPostsComponent],
})
export class MyForumPostsModule {}

