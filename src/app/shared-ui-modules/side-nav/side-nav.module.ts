import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, TieredMenuModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
