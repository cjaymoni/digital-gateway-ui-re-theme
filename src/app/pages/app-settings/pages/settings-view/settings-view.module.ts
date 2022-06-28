import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsViewComponent } from './settings-view.component';
import { AppTabsModule } from '../../../../shared-ui-modules/app-tabs/app-tabs.module';
import { AppHeadingModule } from 'src/app/shared-ui-modules/app-heading/app-heading.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  imports: [CommonModule, AppTabsModule, AppHeadingModule, DirectivesModule],
  declarations: [SettingsViewComponent],
  exports: [SettingsViewComponent],
})
export class SettingsViewModule {}

