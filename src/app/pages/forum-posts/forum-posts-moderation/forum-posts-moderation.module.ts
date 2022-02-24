import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumPostsModerationComponent } from './forum-posts-moderation.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
    MenuModule,
    MessageModule,
    AppPipesModule,
  ],
  declarations: [ForumPostsModerationComponent],
  exports: [ForumPostsModerationComponent],
})
export class ForumPostsModerationModule {}
