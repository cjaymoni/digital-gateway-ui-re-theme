import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsComponent } from './article-details.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ArticleImageModule } from '../article-image/article-image.module';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  imports: [
    CommonModule,
    SkeletonModule,
    ArticleImageModule,
    TagModule,
    OverlayPanelModule,
    ButtonModule,
    ShareButtonsModule,
    ShareIconsModule,
  ],
  declarations: [ArticleDetailsComponent],
  exports: [ArticleDetailsComponent],
})
export class ArticleDetailsModule {}
