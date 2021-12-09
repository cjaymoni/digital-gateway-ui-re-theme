import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { BackButtonModule } from '../back-button/back-button.module';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [TopNavComponent],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    MenuModule,
    BackButtonModule,
    StyleClassModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [TopNavComponent],
})
export class TopNavModule {}
