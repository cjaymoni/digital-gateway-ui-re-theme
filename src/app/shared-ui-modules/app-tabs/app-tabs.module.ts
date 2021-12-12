import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTabsComponent } from './app-tabs.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  imports: [CommonModule, TabViewModule],
  declarations: [AppTabsComponent],
  exports: [AppTabsComponent],
})
export class AppTabsModule {}
