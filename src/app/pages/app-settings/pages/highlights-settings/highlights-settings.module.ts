import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsSettingsComponent } from './highlights-settings.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PickListModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HighlightsSettingsComponent],
  exports: [HighlightsSettingsComponent],
})
export class HighlightsSettingsModule {}
