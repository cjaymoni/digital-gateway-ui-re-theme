import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RightOverlayPanelModule } from '../right-overlay-panel/right-overlay-panel.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { TopNavModule } from '../top-nav/top-nav.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    TopNavModule,
    SideNavModule,
    RouterModule,
    RightOverlayPanelModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
