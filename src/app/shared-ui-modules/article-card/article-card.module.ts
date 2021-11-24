import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { ArticleCardComponent } from './article-card.component';

@NgModule({
  declarations: [ArticleCardComponent],
  imports: [
    CommonModule,
    AppPipesModule,
    DirectivesModule,
    CardModule,
    ButtonModule,
  ],
  exports: [ArticleCardComponent],
})
export class ArticleCardModule {}
