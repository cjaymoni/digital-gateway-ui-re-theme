import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { ArticleImageModule } from '../article-image/article-image.module';
import { ArticleCardComponent } from './article-card.component';

@NgModule({
  declarations: [ArticleCardComponent],
  imports: [
    CommonModule,
    AppPipesModule,
    DirectivesModule,
    CardModule,
    ButtonModule,
    ArticleImageModule,
    TooltipModule,
  ],
  exports: [ArticleCardComponent],
})
export class ArticleCardModule {}
