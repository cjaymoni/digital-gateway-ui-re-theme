import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsSettingsComponent } from './events-settings.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PickListModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EventsSettingsComponent],
  exports: [EventsSettingsComponent],
})
export class EventsSettingsModule {}
