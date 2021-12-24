import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ArticleDetailsModule } from 'src/app/shared-ui-modules/article-details/article-details.module';
import { TestComponentModule } from 'src/app/test/test-component/test-component.module';
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
    TestComponentModule,
    ArticleDetailsModule,
    MyArticlesListModule,
  ],
})
export class ArticlesModule {}
