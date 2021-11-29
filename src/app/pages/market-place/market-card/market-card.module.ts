import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ArticleImageModule } from '../../../shared-ui-modules/article-image/article-image.module';
import { MarketCardComponent } from './market-card.component';

@NgModule({
  imports: [CommonModule, CardModule, ArticleImageModule],
  exports: [MarketCardComponent],
  declarations: [MarketCardComponent],
})
export class MarketCardModule {}
