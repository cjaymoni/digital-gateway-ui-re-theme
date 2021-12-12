import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsSettingsComponent } from './highlights-settings.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, PickListModule, ButtonModule],
  declarations: [HighlightsSettingsComponent],
  exports: [HighlightsSettingsComponent],
})
export class HighlightsSettingsModule {}
