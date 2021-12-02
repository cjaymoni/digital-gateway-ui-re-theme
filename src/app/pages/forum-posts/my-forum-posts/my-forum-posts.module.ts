import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyForumPostsComponent } from './my-forum-posts.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
    MessageModule,
    TagModule,
  ],
  declarations: [MyForumPostsComponent],
  exports: [MyForumPostsComponent],
})
export class MyForumPostsModule {}
