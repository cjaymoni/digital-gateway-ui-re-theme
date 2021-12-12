import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightNavCard } from './right-nav-card.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ArticleImageModule } from '../article-image/article-image.module';

@NgModule({
  imports: [CommonModule, CardModule, DividerModule, ArticleImageModule],
  declarations: [RightNavCard],
  exports: [RightNavCard],
})
export class RightNavCardModule {}
