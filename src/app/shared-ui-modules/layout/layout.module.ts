import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RightOverlayPanelModule } from '../right-overlay-panel/right-overlay-panel.module';
import { ArticleCardModule } from '../article-card/article-card.module';
import { FooterModule } from '../footer/footer.module';

import { SideNavModule } from '../side-nav/side-nav.module';
import { TopNavModule } from '../top-nav/top-nav.module';
import { LayoutComponent } from './layout.component';
import { ArticleFormModule } from '../article-form/article-form.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    TopNavModule,
    SideNavModule,
    RouterModule,
    RightOverlayPanelModule,
    ArticleFormModule,
    ArticleCardModule,
    FooterModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
