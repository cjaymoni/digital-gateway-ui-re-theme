import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsSettingsComponent } from './highlights-settings.component';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  imports: [CommonModule, PickListModule],
  declarations: [HighlightsSettingsComponent],
  exports: [HighlightsSettingsComponent],
})
export class HighlightsSettingsModule {}
