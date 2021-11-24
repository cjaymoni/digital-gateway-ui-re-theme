import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card.component';
import { VotesModule } from '../votes/votes.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ArticleCardComponent],
  imports: [
    CommonModule,
    VotesModule,
    AppPipesModule,
    DirectivesModule,
    CardModule,
    ButtonModule,
  ],
  exports: [ArticleCardComponent],
})
export class ArticleCardModule {}
