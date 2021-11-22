import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TopNavModule } from '../top-nav/top-nav.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { RouterModule } from '@angular/router';
import { RightOverlayPanelModule } from '../right-overlay-panel/right-overlay-panel.module';
import { ArticleCardModule } from '../article-card/article-card.module';
import { FooterModule } from '../footer/footer.module';
import { CommentCardModule } from '../comment-card/comment-card.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    TopNavModule,
    SideNavModule,
    RouterModule,
    RightOverlayPanelModule,
    ArticleCardModule,
    FooterModule,
    CommentCardModule
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
