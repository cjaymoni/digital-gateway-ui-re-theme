import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsSettingsComponent } from './events-settings.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, PickListModule, ButtonModule],
  declarations: [EventsSettingsComponent],
  exports: [EventsSettingsComponent],
})
export class EventsSettingsModule {}
