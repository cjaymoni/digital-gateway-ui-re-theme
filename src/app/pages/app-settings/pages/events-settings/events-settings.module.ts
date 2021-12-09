import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsSettingsComponent } from './events-settings.component';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  imports: [CommonModule, PickListModule],
  declarations: [EventsSettingsComponent],
  exports: [EventsSettingsComponent],
})
export class EventsSettingsModule {}
