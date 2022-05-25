import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaSettingsComponent } from './social-media-settings.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
  ],
  declarations: [SocialMediaSettingsComponent],
  exports: [SocialMediaSettingsComponent],
})
export class SocialMediaSettingsModule { }
