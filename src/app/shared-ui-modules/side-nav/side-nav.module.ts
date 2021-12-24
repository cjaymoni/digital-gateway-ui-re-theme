import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, TieredMenuModule, ButtonModule, DividerModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
