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
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { TooltipModule } from 'primeng/tooltip';

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
    AppPipesModule,
    TooltipModule,
  ],
  exports: [SideNavComponent],
})
export class SideNavModule {}

