import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightOverlayPanelComponent } from './right-overlay-panel.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { CommentCardModule } from '../comment-card/comment-card.module';

@NgModule({
  declarations: [RightOverlayPanelComponent],
  imports: [CommonModule, ScrollPanelModule, ButtonModule,CommentCardModule],
  exports: [RightOverlayPanelComponent],
})
export class RightOverlayPanelModule {}
