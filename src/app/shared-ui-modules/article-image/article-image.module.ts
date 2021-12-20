import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleImageComponent } from './article-image.component';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [ArticleImageComponent],
  exports: [ArticleImageComponent],
  imports: [CommonModule, AvatarModule, ImageModule],
})
export class ArticleImageModule {}
