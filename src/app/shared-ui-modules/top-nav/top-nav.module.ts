import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TopNavComponent],
  imports: [CommonModule, MenubarModule, ButtonModule],
  exports: [TopNavComponent],
})
export class TopNavModule {}
