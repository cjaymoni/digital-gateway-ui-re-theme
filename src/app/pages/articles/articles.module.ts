import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestComponentModule } from 'src/app/test/test-component/test-component.module';
import { ArticleListModule } from './article-list/article-list.module';
import { ArticleRoutesModule } from './articles-routes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ArticleListModule,
    ArticleRoutesModule,
    TestComponentModule,
  ],
})
export class ArticlesModule {}
