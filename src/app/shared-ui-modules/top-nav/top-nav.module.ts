import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [TopNavComponent],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    MenuModule,
  ],
  exports: [TopNavComponent],
})
export class TopNavModule {}
