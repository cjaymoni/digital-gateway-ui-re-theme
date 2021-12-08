import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, TieredMenuModule, ButtonModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
