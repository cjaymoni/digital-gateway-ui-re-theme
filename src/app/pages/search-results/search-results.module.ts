import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { ForumLoadingCardModule } from 'src/app/shared-ui-modules/forum-loading-card/forum-loading-card.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { AppHeadingModule } from 'src/app/shared-ui-modules/app-heading/app-heading.module';
import { ForumCardModule } from 'src/app/shared-ui-modules/forum-card/forum-card.module';
import { ForumPostCardModule } from 'src/app/shared-ui-modules/forum-post-card/forum-post-card.module';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    ForumLoadingCardModule,
    CardModule,
    TabViewModule,
    AppPipesModule,
    AppHeadingModule,
    ForumCardModule,
    ForumPostCardModule,
  ],
  exports: [SearchResultsComponent],
})
export class SearchResultsModule {}

