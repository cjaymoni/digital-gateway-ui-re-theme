import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { RightOverlayPanelComponent } from './right-overlay-panel.component';

@NgModule({
  declarations: [RightOverlayPanelComponent],
  imports: [CommonModule, ScrollPanelModule, ButtonModule, SidebarModule],
  exports: [RightOverlayPanelComponent],
})
export class RightOverlayPanelModule {}
