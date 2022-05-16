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
import { AlertsModule } from '../alerts/alerts.module';
import { RightNavCardModule } from '../right-nav-card/right-nav-card.module';
import { ModalComponentsModule } from '../modal-components/modal-components.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BackButtonModule } from '../back-button/back-button.module';
import { TooltipModule } from 'primeng/tooltip';
import {ScrollTopModule} from 'primeng/scrolltop';

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
    AlertsModule,
    RightNavCardModule,
    ModalComponentsModule,
    BreadcrumbModule,
    BackButtonModule,
    TooltipModule,
    ScrollTopModule
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}

