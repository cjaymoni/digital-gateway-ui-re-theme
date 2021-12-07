import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ModalComponentsComponent } from './modal-components.component';

@NgModule({
  declarations: [ModalComponentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    DynamicDialogModule,
    ButtonModule,
  ],
  exports: [ModalComponentsComponent],
  providers: [DynamicDialogRef, DynamicDialogConfig],
})
export class ModalComponentsModule {}
