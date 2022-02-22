import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedCategoriesCardComponent } from './featured-categories-card.component';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    ImageModule,
    AppPipesModule,
    DirectivesModule,
    CardModule,
    TooltipModule,
  ],
  declarations: [FeaturedCategoriesCardComponent],
  exports: [FeaturedCategoriesCardComponent],
})
export class FeaturedCategoriesCardModule {}
