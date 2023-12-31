import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ArticleCardModule } from 'src/app/shared-ui-modules/article-card/article-card.module';
import { ListingPageModule } from 'src/app/shared-ui-modules/listing-page/listing-page.module';
import { ArticleListComponent } from './article-list.component';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    CommonModule,
    ArticleCardModule,
    ListingPageModule,
    PaginatorModule,
  ],
  exports: [ArticleListComponent],
})
export class ArticleListModule {}
