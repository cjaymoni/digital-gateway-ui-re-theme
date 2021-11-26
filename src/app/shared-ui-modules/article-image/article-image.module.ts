import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleImageComponent } from './article-image.component';

@NgModule({
  declarations: [ArticleImageComponent],
  exports: [ArticleImageComponent],
  imports: [CommonModule],
})
export class ArticleImageModule {}
