import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { ForumLoadingCardModule } from 'src/app/shared-ui-modules/forum-loading-card/forum-loading-card.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [CommonModule, ForumLoadingCardModule, CardModule, TabViewModule, AppPipesModule],
  exports: [SearchResultsComponent],
})
export class SearchResultsModule {}
