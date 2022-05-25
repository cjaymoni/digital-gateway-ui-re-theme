import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ArticleDetailsModule } from 'src/app/shared-ui-modules/article-details/article-details.module';
import { ArticleListModule } from './article-list/article-list.module';
import { ArticleRoutesModule } from './articles-routes.module';
import { MyArticlesListModule } from './my-articles-list/my-articles-list.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ArticleListModule,
    ArticleRoutesModule,
    ArticleDetailsModule,
    MyArticlesListModule,
  ],
})
export class ArticlesModule {}

