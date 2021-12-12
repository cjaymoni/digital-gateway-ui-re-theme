import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsViewComponent } from './settings-view.component';
import { AppTabsModule } from '../../../../shared-ui-modules/app-tabs/app-tabs.module';

@NgModule({
  imports: [CommonModule, AppTabsModule],
  declarations: [SettingsViewComponent],
  exports: [SettingsViewComponent],
})
export class SettingsViewModule {}
