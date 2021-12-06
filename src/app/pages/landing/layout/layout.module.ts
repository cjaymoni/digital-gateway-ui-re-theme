import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { CarouselModule } from 'primeng/carousel';
import { ArticleCardModule } from 'src/app/shared-ui-modules/article-card/article-card.module';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    ArticleCardModule,
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
