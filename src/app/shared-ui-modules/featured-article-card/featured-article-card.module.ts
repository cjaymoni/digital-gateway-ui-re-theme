import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedArticleCardComponent } from './featured-article-card.component';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { ImageModule } from 'primeng/image';

@NgModule({
  imports: [
    CommonModule,
    AppPipesModule,
    DirectivesModule,
    CardModule,
    ImageModule,
    TooltipModule,
  ],
  declarations: [FeaturedArticleCardComponent],
  exports: [FeaturedArticleCardComponent],
})
export class FeaturedArticleCardModule {}
