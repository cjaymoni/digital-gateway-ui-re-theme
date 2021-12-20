import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { ForumLoadingCardModule } from 'src/app/shared-ui-modules/forum-loading-card/forum-loading-card.module';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [CommonModule, ForumLoadingCardModule],
  exports: [SearchResultsComponent],
})
export class SearchResultsModule {}
