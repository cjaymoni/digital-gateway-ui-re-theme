import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightOverlayPanelComponent } from './right-overlay-panel.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [RightOverlayPanelComponent],
  imports: [CommonModule, ScrollPanelModule, ButtonModule],
  exports: [RightOverlayPanelComponent],
})
export class RightOverlayPanelModule {}
