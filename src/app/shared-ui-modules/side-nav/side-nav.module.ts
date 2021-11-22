import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, PanelMenuModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
