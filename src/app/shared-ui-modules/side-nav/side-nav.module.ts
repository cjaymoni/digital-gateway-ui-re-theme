import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { LoginButtonModule } from '../login-button/login-button.module';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    TieredMenuModule,
    ButtonModule,
    DividerModule,
    MenuModule,
    SidebarModule,
    LoginButtonModule,
    ClickOutsideModule,
  ],
  exports: [SideNavComponent],
})
export class SideNavModule {}
